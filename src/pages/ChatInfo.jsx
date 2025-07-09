import React, { useEffect, useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import appLayout from '../components/Layout/appLayout';
import { useNavigate } from 'react-router-dom';
import { useAddGroupMemberMutation, useAvailableFriendsQuery, useChatDetailsQuery, useDeleteGroupChatMutation, useLeaveGroupChatMutation, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../redux/api/api';
import { useAsyncMutation, useErrors } from '../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMembers, setIsDeleteMenu } from '../redux/reducers/misc';
import AddMembersDialog from '../components/dialog/addMembersDialog';
import ConfirmDeleteDialog from '../components/dialog/ConfirmDeleteDialog';

const ChatInfo = ({chatId}) => {

  const {user} = useSelector(state=>state.auth);
  

  const dispatch =useDispatch();

  const {isAddMembers} = useSelector(state=>state.misc);
  const {isDeleteMenu} = useSelector(state=>state.misc);

  const [isEdit, setIsEdit] = useState(false);
  const [chatName, setChatName] = useState('');
  const [chatNameUpdatedValue, setChatNameUpdatedValue] = useState('');
  const [members, setMembers] = useState([]);
  const [availabelFriendes,setAvailbaleFriends] = useState([]);
  const [creator,setCreator] = useState(false);  

  const navigate = useNavigate();

  const { data:chatDetailsData, isLoading:isLoadingChatDetails, error:errorChatDetails, isError:isErrorChatDetails } = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );



  const {data:friendsData,isLoading:isLoadingFriendsData,error:errorFriendsData,isError:isErrorFriendsData} = useAvailableFriendsQuery();


  const [renameGroup, isLoadingRename] = useAsyncMutation(useRenameGroupMutation);

  const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMemberMutation);

  const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMemberMutation);

  const [deleteGroup,isLoadingDeletingGroup] =useAsyncMutation(useDeleteGroupChatMutation);

  const [leaveGroup,isLoadingLeaveGroup] = useAsyncMutation(useLeaveGroupChatMutation);


  useErrors([{ isError:isErrorChatDetails, error:errorChatDetails },
             {isError:isErrorFriendsData, error:errorFriendsData }]);

  
  useEffect(() => {
    if (chatDetailsData) {
      setChatName(chatDetailsData.chat.name);
      setChatNameUpdatedValue(chatDetailsData.chat.name);
      setMembers(chatDetailsData.chat.members);
    }
    if(chatDetailsData && chatDetailsData.chat.creator === user.data._id) {
        setCreator(true);
    }
    return () => {
      setChatName('');
      setChatNameUpdatedValue('');
      setMembers([]);
      setIsEdit(false);
    };
  }, [chatDetailsData]);

  useEffect(()=>{
    if(friendsData?.friends){
      const existingMemberIds = members.map((m) => m._id);
      
      const nonMembers = friendsData.friends.filter(
      (friend) => !existingMemberIds.includes(friend._id)
      );
      setAvailbaleFriends(nonMembers);
    }

    return ()=>{
      setAvailbaleFriends([]);
    }
  },[friendsData,members]);



  const handleChatNameChange = async () => {
    setIsEdit(false);
    if (chatNameUpdatedValue !== chatName) {
      await renameGroup('Updating group name...', {
        chatId,
        name: chatNameUpdatedValue,
      });
      setChatName(chatNameUpdatedValue);
    }
  };


  const handleAddMembers=()=>{
      dispatch(setIsAddMembers(true));
  }

  const handleAddMembersSubmit=async (userIds)=>{
    await addMember("Adding members",{chatId,members:userIds});
    dispatch(setIsAddMembers(false));
  }

  const handleRemoveMember = (userId) => {
    removeMember("Removing Member...",{chatId,userId});
  };

  const handleDeleteChat = () => {
    dispatch(setIsDeleteMenu(true));
  };

  const handleConfirmDelete =async ()=>{
    if(creator){
      await deleteGroup("Deleting Group...",chatId);
    }else{
      await leaveGroup("Leaving Group...",chatId);
    }
  }

  // if (isLoadingChatDetails) return <div className="p-6 text-gray-600">Loading chat details...</div>;
  // if (isErrorChatDetails) return <div className="p-6 text-red-600">Error loading chat: {error.message}</div>;

  return isLoadingChatDetails ?(<div>Loading Chat Information...</div>) : (
    <div className="flex-1 p-6">
      {chatDetailsData?.chat ? (
        <>
          {/* Chat name (editable) */}
          <div className="flex justify-center py-5">
            {isEdit ? (
              <input
                value={chatNameUpdatedValue}
                onChange={(e) => setChatNameUpdatedValue(e.target.value)}
                onBlur={handleChatNameChange}
                autoFocus
                className="text-2xl font-semibold border-b border-gray-400 focus:outline-none"
                disabled={isLoadingRename}
              />
            ) : (
              <h2
                className="text-2xl font-semibold cursor-pointer"
                onClick={() => setIsEdit(true)}
              >
                {chatName}
              </h2>
            )}
          </div>

          {/* Chat avatar */}
          <div className="flex justify-center mb-6">
            <img
              src={chatDetailsData.chat.avatar || chatDetailsData.chat.members[0]?.avatar}
              alt="Chat Avatar"
              className="w-20 h-20 rounded-full object-cover border"
            />
          </div>

          {/* Members */}
          <div className="m-6">
            <h3 className="text-lg font-medium mb-2">Members</h3>
            <ul className="space-y-3 flex flex-col justify-center items-center m-4">
              {members.map((member) => (
                <li
                  key={member._id}
                  className="flex items-center justify-between p-2 bg-white rounded shadow-sm w-[650px]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="font-medium text-gray-800">{member.name}</span>
                  </div>
                    {chatDetailsData?.chat?.isGroup && (<button
                            onClick={() => handleRemoveMember(member._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove member"
                            disabled={isLoadingRemoveMember}
                          >
                            <FaMinusCircle size={20} />
                      </button>)}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {chatDetailsData?.chat?.isGroup && <button onClick={handleAddMembers}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add Members
            </button>}
            {
              isAddMembers && <AddMembersDialog onAdd={handleAddMembersSubmit} users={availabelFriendes} isLoadingFriendsData={isLoadingFriendsData}/>                
            }
            <button
                onClick={handleDeleteChat}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                disabled={isLoadingDeletingGroup || isLoadingLeaveGroup}
              >
                {!chatDetailsData?.chat?.isGroup ? "Delete Chat":(creator ?"Delete Group":"Leave Group")}
            </button>
            

            {isDeleteMenu && 
              <ConfirmDeleteDialog 
                  onConfirm={handleConfirmDelete}
                  creator={creator}
              />
            }
          </div>
        </>
      ) : (
        <div className="text-gray-600 text-lg">No chat selected.</div>
      )}
    </div>
  );
};

export default appLayout()(ChatInfo);
