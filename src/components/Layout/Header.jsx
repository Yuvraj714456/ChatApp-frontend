import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoMdPersonAdd } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { MdGroups } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { resetNotificationCount } from "../../redux/reducers/chat";
import { setIsMobile, setIsMyProfile, setIsNewGroup, setIsNotification, setIsSearch } from "../../redux/reducers/misc";
import AvatarCard from "../shared/AvatarCard";

const Header = () => {
    const dispatch = useDispatch();
    const {isMobile,isSearch,isMyProfile}= useSelector((state)=>state.misc);
    const {notificationCount} = useSelector(state=>state.chat);

    const {user} = useSelector(state=>state.auth);

    const onOpenSearch = ()=>{
        dispatch(setIsSearch(!isSearch));
    }

    const onOpenNotification=()=>{
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount());
    }
    

    const handleMobile =()=>{
        dispatch(setIsMobile(!isMobile));
    }

    const onOpenNewGroup = ()=>{
        dispatch(setIsNewGroup(true));
    }

    const openMyProfile=()=>{
        dispatch(setIsMyProfile(!isMyProfile));
    }

  return (
    <div className="w-full bg-[#F0F0F0] text-black p-4 shadow-md sticky top-0 z-20 border-b border-gray-700/50">
        <div className="container mx-auto flex justify-between items-center">
            <div className='flex items-center'>
                <div className="hidden sm:block text-2xl font-bold tracking-tight hover:text-app-accent transition-colors duration-200 cursor-pointer">Chat App</div>  
                <div className="block sm:hidden" onClick={handleMobile}><HiOutlineMenuAlt2 size={40}/></div>  
            </div>
            <div className='flex items-center space-x-2 sm:space-x-4 relative'>
                <div onClick={onOpenSearch} className="p-2 sm:p-2 rounded-full hover:bg-app-hover hover:text-app-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 focus:ring-offset-app-bg"><IoMdPersonAdd size={20}/></div>
                <div onClick={onOpenNewGroup} className="p-2 sm:p-2 rounded-full hover:bg-app-hover hover:text-app-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 focus:ring-offset-app-bg"><MdGroups size={30}/></div>
                <div onClick={onOpenNotification} className="relative p-2 sm:p-2 rounded-full hover:bg-app-hover hover:text-app-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-app-accent focus:ring-offset-2 focus:ring-offset-app-bg">
                    {notificationCount > 0  &&
                        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {notificationCount >99 ? "99+" : notificationCount}
                        </div> 
                    }
                    <IoNotifications size={20}/>
                </div>
                <div onClick={openMyProfile}
                    className="relative p-1 sm:p-2 rounded-full hover:bg-app-hover hover:text-app-accent transition-all duration-200 cursor-pointer"
                    >
                    <AvatarCard avatar={user?.avatar?.url} size={40}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header