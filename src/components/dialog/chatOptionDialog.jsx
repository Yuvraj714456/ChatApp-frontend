import React, { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import {
  FiMessageCircle,
  FiInfo,
  FiTrash2,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAsyncMutation } from "../../hooks/hook";
import { useDeleteGroupChatMutation, useLeaveGroupChatMutation } from "../../redux/api/api";
import { useSelector } from "react-redux";


const ChatOptionDialog = ({
  isOpen,
  x=0,
  y=0,
  onClose,
  onOpenChat,
  onViewInfo,
  isGroup = false,
}) => {

  if (!isOpen) return null;

  const {selectedDeleteChat}=useSelector(state=>state.misc);

  const navigate = useNavigate();

  const [deleteChat,_,deletedChatData] =useAsyncMutation(useDeleteGroupChatMutation);

  const [leaveGroup,_1,leaveGroupData] =useAsyncMutation(useLeaveGroupChatMutation);

  const leaveGroupHandler = ()=>{
    onClose();
    leaveGroup("Leaving Group...",selectedDeleteChat.chatId);
  }

  const deleteChatHandler = ()=>{

      onClose();
      deleteChat("Deleting Chat...",selectedDeleteChat.chatId);
  }

  useEffect(()=>{
    if(deletedChatData || leaveGroupData){
      navigate('/');
    }
  },[deletedChatData,leaveGroupData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute z-50"
            style={{
              top: y,
              left: x,
              minWidth: "200px",
              borderRadius: "8px",
              backgroundColor:"rgba(236, 236, 236, 0.8)",
              padding: "1rem",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              border: "1px solid #333"
            }}>
        {/* Close Button */}
        <div className=" flex justify-between items-center">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-6 text-center">Chat Options</h2>
        </div>

        {/* Option Buttons */}
        <div className="flex flex-col gap-2">
          <OptionButton icon={<FiMessageCircle />} label="Open Chat" onClick={onOpenChat} />
          <OptionButton icon={<FiInfo />} label="View Info" onClick={onViewInfo} />
          {!isGroup ? 
            (<OptionButton icon={<FiTrash2 />} label="Delete Chat" onClick={deleteChatHandler} />):
            (
              <OptionButton icon={<FiLogOut />} label="Leave Group" onClick={leaveGroupHandler} />
          )}
          <OptionButton icon={<FiX />} label="Cancel" onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

const OptionButton = ({ icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full py-2 px-4 rounded-md border border-gray-200 hover:bg-gray-100 transition"
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default ChatOptionDialog;
