import React, { useState } from 'react'
import {useInputValidation} from '6pp'
import UserItem from '../shared/UserItem';
import { useDispatch } from 'react-redux';
import { setIsSearch } from '../../redux/reducers/misc';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { useEffect } from 'react';
import { useAsyncMutation } from '../../hooks/hook.jsx';

const Search = () => {
  const search = useInputValidation("");

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);


  const addFriendHandler = async (id)=>{
     await sendFriendRequest("Sending friend request...",{userId:id});
  }
  const dispatch = useDispatch();

  const onClose = ()=>{
    dispatch(setIsSearch(false));
  }
  const [users,setUsers]=useState([]);

  useEffect(()=>{

    const timeOutId= setTimeout(()=>{
      searchUser(search.value).then(({data})=>setUsers(data.users)).catch((e)=>console.log(e));
    },1000)

    return ()=>{
      clearTimeout(timeOutId);
    }
    
  },[search.value])

  return (
    <div className="p-10 bg-gray-900 text-white rounded-lg shadow-lg w-[500px]  border border-[#293038]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Find People</h2>
        <button
          className="text-red-500 hover:text-[#ffffff] text-4xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
          <input type="text" 
                  placeholder='username' 
                  value={search.value} 
                  onChange={search.changeHandler}
                  className='w-full p-2 mb-4 bg-[#1a1a1a] text-white border border-[#293038] rounded focus:outline-none focus:ring-2 focus:ring-[#293038]'
                  autoFocus 
                  />
      <div className="max-h-64 overflow-y-auto">
        {
        search.value===""?(<p className='text-center text-[#9dabb8]'>Enter The Name...</p>):
        (users.length>0 ? 
            users.map((user)=>(
                      <UserItem user={user} 
                                key={user._id} 
                                handler={addFriendHandler} 
                                handlerIsLoading={isLoadingSendFriendRequest}
                                
                                />
                  )):(<p className='text-center text-[#9dabb8]'>No Users Found...</p>)
          )
        }
      </div>
    </div>
  )
}

export default Search