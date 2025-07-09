import { useInputValidation } from '6pp';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { server } from '../constant/config';
import AvatarUpload from '../lib/AvatarUpload';
import { userNameValidator } from '../lib/validator';
import { userExists } from '../redux/reducers/auth';

const Login = () => {
    const [isLogin,setIsLogin] = useState(true); 
    const [avatar,setAvatar] = useState(null);

    const [isLoading,setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const name = useInputValidation("");
    const userName = useInputValidation("",userNameValidator);
    const password = useInputValidation("");
    const confirmPassword = useInputValidation();


    const handleLogIn = async (e)=>{
        e.preventDefault();
        const toastId = toast.loading("Logging In ...");
        setIsLoading(true);

         const config ={
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
         };
         try {
            const {data}=await axios.post(`${server}/api/v1/user/login`,{
                        username:userName.value,
                        password:password.value
                    },config);

                    dispatch(userExists(data.user))

                    toast.success(data.message,{id:toastId});
         }catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong",{id:toastId});
         }finally{
            setIsLoading(false);
         }
    }

    const handleSignUp = async (e) =>{
        e.preventDefault();

        const toastId = toast.loading("Signing Up ...");
        setIsLoading(true);


        const formData = new FormData();

        formData.append("name",name.value);
        formData.append("username",userName.value);
        formData.append("password",password.value);
        formData.append("confirmPassword",confirmPassword.value);
        formData.append("avatar",avatar)

        const  config = {
                withCredentials:true,
                headers:{
                    "Content-Type":"multipart/form-data",
                }
        }
        try {
            const {data} = await axios.post(`${server}/api/v1/user/newUser`,
                            formData,
                            config);
            toast.success(data.message,{id:toastId});
            dispatch(userExists(data.user));
        } catch(error) {
            toast.error(error?.response?.data?.message,{id:toastId});
        }finally{
            setIsLoading(false);
        }
    }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
  <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition-all duration-300">
    
    <div className="text-3xl font-bold text-center text-gray-800 mb-6">
      {isLogin ? "Login" : "Sign Up"}
    </div>

    <form onSubmit={isLogin ? handleLogIn : handleSignUp} className="space-y-4">
      {!isLogin && (
        <>
          <AvatarUpload setAvatarFile={setAvatar} />

          <input
            type="text"
            required
            placeholder="Name"
            value={name.value}
            onChange={name.changeHandler}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <input
        type="text"
        required
        placeholder="Username"
        value={userName.value}
        onChange={userName.changeHandler}
        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {!isLogin && userName.error && (
        <div className="text-sm text-red-500 -mt-2">{userName.error}</div>
      )}

      <input
        type="password"
        required
        placeholder="Password"
        value={password.value}
        onChange={password.changeHandler}
        className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {!isLogin && (
        <input
          type="password"
          required
          placeholder="Confirm Password"
          value={confirmPassword.value}
          onChange={confirmPassword.changeHandler}
          className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-500 transition duration-200 disabled:opacity-60"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
    </form>

    <div className="mt-6 text-center text-gray-700">
      {isLogin ? "Don't have an account?" : "Already have an account?"}
      <button
        onClick={() => setIsLogin((prev) => !prev)}
        className="text-blue-500 ml-2 font-semibold"
        disabled={isLoading}
      >
        {isLogin ? "Sign Up" : "Login"}
      </button>
    </div>
  </div>
</div>

  )
}

export default Login