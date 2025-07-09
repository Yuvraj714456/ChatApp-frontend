import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/Layout/AdminLayout';
import { useAdminGetAllUsersMutation } from '../../redux/api/api';
import { useAsyncMutation } from '../../hooks/hook';
import toast from 'react-hot-toast';

const UserManagement = () => {
  const [users,setUsers] = useState(null);
  const [loading,setLoading] = useState(false);

  const [getUsers] = useAdminGetAllUsersMutation();


  useEffect(()=>{
    setLoading(true);
    const getData =async ()=>{
      try {
        const res = await getUsers().unwrap();
        if(res?.success){
          setUsers(res.data);
        }
      } catch (error) {
        toast.error(error);
      }finally{
        setLoading(false);
      }
    }
    getData();

  },[]);


  return (
    <AdminLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-center rounded-md shadow-2xl bg-white p-4">ALL USERS</h2>
        <div className='overflow-hidden rounded-md'>
            { loading ? (<div>Loading... </div>):( Array.isArray(users) && users.length > 0 ? (
                              <table className="w-full text-center">
                                <thead className="bg-white text-black">
                                  <tr>
                                    <th className="p-2">ID</th>
                                    <th className="p-2">Avatar</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Username</th>
                                    <th className="p-2">Friends</th>
                                    <th className="p-2">Groups</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {users.map(user => (
                                    <tr key={user._id} className="border-b">
                                      <td className="p-2">{user._id}</td>
                                      <td className="p-2 flex justify-center items-center">
                                        <img
                                          src={user.avatar}
                                          alt={user.name}
                                          className="w-10 h-10 rounded-full"
                                        />
                                      </td>
                                      <td className="p-2">{user.name}</td>
                                      <td className="p-2">{user.username}</td>
                                      <td className="p-2">{user.friends}</td>
                                      <td className="p-2">{user.groups}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            ) : (
                              <div className="text-center text-gray-500 py-10">No users found.</div>
                            ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserManagement;