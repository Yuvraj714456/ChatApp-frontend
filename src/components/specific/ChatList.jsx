import { useState } from 'react';
import ChatItem from '../shared/ChatItem'
import { useNavigate } from 'react-router-dom';
import ChatOptionDialog from '../dialog/chatOptionDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setIsSelectedDeleteChat } from '../../redux/reducers/misc';

const ChatList = ({chats=[],
                  chatId,
                  newMessagesAlert=[{
                      chatId:"",
                      count:0
                  }]}
)=> {

  const [selectedChat,setSelectedChat] = useState(null);
  const [isDialogOpen,setIsDialogOpen] = useState(false);
  const [dialogPosition,setDialogPosition] = useState({x:0,y:0});
  const navigate = useNavigate();

  const {activeUsers} =useSelector(state=>state.misc);
  const {user} = useSelector(state=>state.auth);


  const dispatch = useDispatch();


  const handleOptionsOpen = (event, chat) => {
      event.preventDefault();
      const dialogWidth = 220;
      const dialogHeight = 220;
      const x = Math.min(event.clientX, window.innerWidth -dialogWidth -20);
      const y = Math.min(event.clientY, window.innerHeight-dialogHeight - 20); 
      const chatId=chat._id;
      const isGroup = chat.isGroup

      setSelectedChat(chat);
      dispatch(setIsSelectedDeleteChat({chatId,isGroup}));
      setDialogPosition({ x, y });
      setIsDialogOpen(true);
  };

    const handleDialogClose = () => {
      setSelectedChat(null);
      setIsDialogOpen(false);
    };
  
  return (
    <aside 
      className={`h-full flex flex-col  bg-[#1e1e1e] text-gray-400 shadow-lg z-10 w-[30.3%] border-r border-gray-700/50 min-w-[470px]`}
      style={{
        fontFamily: 'Manrope, "Noto Sans", sans-serif',
         // Use pixel width if resizing, else prop
        }}
      overflow={"auto"}
      >
        <div className='flex-1 overflow-y-auto'>
          {
              chats?.map((data,index)=>{
                  const {avatar,name,_id,isGroup,members}=data;

                  const newMessageAlert = newMessagesAlert.find(({chatId})=> chatId === _id) || {
                                                  chatId: _id,
                                                  count: 0,
                                                };

                  const otherUserId = isGroup 
                        ? null
                        : members.find(id=>id !== user._id);
                        
                  const isOnline = otherUserId ? activeUsers.includes(otherUserId) : false;  
                  
                return( <ChatItem 
                          index={index}
                          newMessageAlert={newMessageAlert} 
                          avatar={avatar}
                          name={name}
                          _id={_id}
                          key={_id}
                          groupChat={isGroup}
                          sameSender={ chatId === _id}
                          onOptionsOpen={handleOptionsOpen}
                          isOnline={isOnline}
                        />)
            })
          }
          <ChatOptionDialog
              isOpen={isDialogOpen}
              onClose={handleDialogClose}
              x={dialogPosition.x}
              y={dialogPosition.y}
              isGroup={selectedChat?.isGroup}
              onOpenChat={() => {
                handleDialogClose();
                navigate(`/chat/${selectedChat?._id}`);
              }}
              onViewInfo={() => {
                handleDialogClose();
                navigate(`/chat/info/${selectedChat?._id}`);
              }}
            />
        </div>
    </aside>
  )
}

export default ChatList