import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useAdminLoginMutation } from '../../redux/api/api';
import { adminExist, userExists } from '../../redux/reducers/auth';
import toast from 'react-hot-toast';

const AdminLogin = () => {

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const {isAdmin} = useSelector(state=>state.auth);

    const dispatch = useDispatch();

    const [login] = useAdminLoginMutation();


    if(isAdmin) return <Navigate to='/admin/dashboard'/>

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ username, password }).unwrap();
            if (res?.success) {
            toast.success("Logged In")    
            dispatch(adminExist());
            }
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error);
        }
    };
  return    (
    <>
         <div className='bg-gray-100 flex items-center justify-center min-h-screen '>
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</div>
                <form action="" onSubmit={handleLogIn} className='w-full'>
                    <div className='mb-6'>
                        <input type="text" 
                        required
                        placeholder='UserName'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                        className="w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className=''>
                        <input type="password" 
                        required
                        placeholder='password'
                        value={password}
                        onChange={((e)=>setPassword(e.target.value))}
                        className="w-full px-3 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className='text-blue-600 p-3 text-right '>Forgot Password</div>

                    <button type='submit' className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200">
                            Login
                    </button>

                </form>

            </div>
            
        </div>
    </>
  )
}

export default AdminLogin