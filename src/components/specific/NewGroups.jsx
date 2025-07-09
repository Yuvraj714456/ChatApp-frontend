import React, { use, useState } from 'react'
import { sampleUsers } from '../../constant/Sampledata'
import UserItem from '../shared/UserItem'
import { useInputValidation } from '6pp';
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setIsNewGroup } from '../../redux/reducers/misc';

const NewGroups = () => {

  const dispatch = useDispatch();

  const {isError,isLoading,error,data} = useAvailableFriendsQuery();

  const [newGoup,isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

  useErrors([{isError,error}])

  const groupName = useInputValidation();

  const [selectedMembers,setSelectedMembers] =useState([]);

  const selectMemberHandler=(id)=>{
      setSelectedMembers((prev)=>prev.includes(id)?prev.filter(currentElemnet=>id!==currentElemnet):[...prev,id]);
  }

  const submitHandler=()=>{
    if(!groupName.value) return toast.error("Group name is required");

    if(selectedMembers.length<2) return toast.error("please select mor than one person");
    newGoup("Creating New Group...",{name:groupName.value,members:selectedMembers});
  }

  const closeHandler = ()=>{
        dispatch(setIsNewGroup(false));
  }

  return (
        <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg w-[550px] border border-gray-700">
          <h2 className="text-lg font-semibold mb-4">New Group</h2>
          <input type="text" 
                  placeholder='Group name' 
                  value={groupName.value} 
                  onChange={groupName.changeHandler}
                  className='w-full p-2 mb-4 bg-[#1a1a1a] text-white border border-[#293038] rounded focus:outline-none focus:ring-2 focus:ring-[#293038]'
                  autoFocus 
                  />

          <div>Members</div>
          {isLoading?(<div>Loading...</div>):
          (data?.friends?.map((user)=>(
              <UserItem 
                    user={user}
                    key={user._id}
                    handler={selectMemberHandler}
                    isAdded={selectedMembers.includes(user._id)}
                />
           )))
          }
          <div className='flex justify-between items-center px-15 m-4'>
            <button onClick={closeHandler} >
              Cancel
            </button>
            <button onClick={submitHandler} disabled={isLoadingNewGroup}>
              Create
            </button>
          </div>
        </div>
      
    )
}

export default NewGroups