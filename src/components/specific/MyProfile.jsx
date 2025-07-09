// // import React from 'react'

// // const MyProfile = () => {


// //   const handleLogOut= async()=>{
// //         try {
// //             await axios.get(`${server}/api/v1/user/logout`,{withCredentials:true});
// //             dispatch(userNotExists());
// //             toast.success("Logout Successfully");
// //         } catch (error) {
// //             toast.error(error?.response?.data?.message || "Something went wrong");
// //         }
// //     }
// //   return (
// //     <div>MyProfile</div>
// //   )
// // }

// // export default MyProfile



import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { server } from '../../constant/config';
import AvatarUpload from '../../lib/AvatarUpload';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsMyProfile } from '../../redux/reducers/misc';

const MyProfile = () => {
  const dispatch = useDispatch();
  const {isMyProfile} = useSelector(state=>state.misc)

  const {user} = useSelector(state=>state.auth);

  const [avatarFile,setAvatarFile] = useState(user?.avatar?.url);


  const handleLogOut = async () => {
    try {
      await axios.get(`${server}/api/v1/user/logout`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success('Logout Successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    if (confirmDelete) {
      console.log('Account deleted');
      onClose();
    }
  };

  const onClose = () => {
    dispatch(setIsMyProfile(!isMyProfile));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 ">
      <div className=" text-white w-[90%] bg-gray-900 max-w-md p-6 rounded-xl shadow-xl relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Profile</h2>
          <button onClick={onClose} className="text-red-500 text-2xl hover:text-red-600">
            <IoMdClose />
          </button>
        </div>

        {/* Avatar & Info */}
        <div className="flex flex-col items-center text-center">
          
            <AvatarUpload setAvatarFile={setAvatarFile} existingFileUrl={avatarFile}/>
        
          <h3 className="text-2xl font-semibold">{user.name}</h3>
          <p className="text-gray-400 mb-6">@{user.username}</p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleLogOut}
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Logout
          </button>
          <button
            onClick={handleDeleteAccount}
            className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-medium"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;







