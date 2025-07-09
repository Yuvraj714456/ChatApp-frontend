import React, { useState } from 'react'
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdCloseCircleOutline,IoIosLogOut } from "react-icons/io";
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { adminNotExist } from '../../redux/reducers/auth';
import { useAdminLogoutMutation } from '../../redux/api/api';



const adminTabs =[
    {
        name:"Dashboard",
        path:"/admin/dashboard",
        icon:<MdSpaceDashboard/>
    },
    {
        name:"Users",
        path:"/admin/usermanagement",
        icon:<MdSpaceDashboard/>
    },
]

const AdminLayout = ({children}) => {

    const {isAdmin} = useSelector(state=>state.auth);

    const [isMobile,setIsmobile]=useState(false);
    const handleMobile =()=>{
            setIsmobile(!isMobile);
    }
    if (!isAdmin)return <Navigate to='/admin'/>

    const handleClose=()=>setIsmobile(false);

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 w-full min-h-screen relative'>
        <div className='md:hidden block absolute p-4 right-0'>
            <button onClick={handleMobile} className='cursor-pointer'>
                {
                    isMobile ? <IoMdCloseCircleOutline size={23} /> : <HiOutlineMenuAlt3 size={20}/>
                }
            </button>
        </div>
        <div className='hidden md:block min-h-screen col-span-3 w-full'><SideBar/></div>
        {isMobile && (
        <>
          <div
            className="fixed inset-0 bg-gray-600 opacity-50 z-40"
            onClick={handleClose}
          />
          <div className='fixed top-0 left-0 w-3/4 h-screen bg-white z-50 shadow-md p-4 transition-transform duration-300 ease-in-out'>
            <SideBar />
          </div>
        </>
      )}
        <div className='col-span-1 md:col-span-9 w-full bg-gray-100'>{children}</div>
    </div>
  )
}

const SideBar = ()=>{
    const location =useLocation();

    const dispatch = useDispatch();

    const [logout] = useAdminLogoutMutation();

    const logOutHandler=()=>{
      logout();
      dispatch(adminNotExist());
    }

    return <div className='w-full min-h-screen '>
                <div className='text-center text-3xl rounded-md shadow-md bg-white p-3' >Chat App</div>
                <div>
                   {
                    adminTabs.map((tab)=>(
                        <Link key={tab.path} to={tab.path}>
                            <div className='flex  items-center p-4 hover:bg-gray-200 h-10 text-2xl m-4 '>
                                <div className='mr-2'>{tab.icon}</div>
                                <div className={`${location.pathname === tab.path ? "rounded-md bg-gray-600 text-white px-2":""}`}>{tab.name}</div>
                            </div>
                        </Link>
                    ))
                   }
                   <button className='flex  items-center p-4 hover:bg-gray-200 h-10 text-2xl m-4 gap-4' onClick={logOutHandler}>
                      <IoIosLogOut size={30}/>
                      <div>Log Out</div>
                   </button>
                </div>
            </div>
}

export default AdminLayout