import { useInfiniteScrollTop } from '6pp';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BsFillSendFill } from "react-icons/bs";
import { GrAttachment } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FileMenu from '../components/dialog/FileMenu.jsx';
import appLayout from '../components/Layout/appLayout.jsx';
import { TypingLoader } from '../components/Layout/Loaders.jsx';
import MessageComponent from '../components/shared/MessageComponent.jsx';
import { ALERT, NEW_MESSAGE, START_TYPING, STOP_TYPING} from '../constant/events.js';
import { useErrors, useSocketEvents } from '../hooks/hook.jsx';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api.js';
import { removeNewMessagesAlert } from '../redux/reducers/chat.js';
import { setIsActiveusers, setIsFileMenu } from '../redux/reducers/misc.js';
import { useSocket } from '../socket.jsx';


const Chat = ({chatId,user}) => {

  const socket = useSocket();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const bottomRef = useRef(null);

  const {isFileMenu} = useSelector(state=>state.misc);
  
  const [message, setMessage] = useState('');
  const [messages,setMessages]=useState([]);
  const [page,setPage] = useState(1);

  const [iAmTyping,setIAmTyping] = useState(false);
  const [userTyping,setUserTyping] = useState(false);
  const typingTimeout = useRef(null);


  const chatDetails = useChatDetailsQuery({chatId,skip:!chatId});

  const oldMessagesChunk = useGetMessagesQuery({chatId,page});

  const {data:oldMessages,setData:setOldMessages} = useInfiniteScrollTop(
            containerRef,
            oldMessagesChunk.data?.totalPages,
            page,
            setPage,
            oldMessagesChunk.data?.message
          );

  const errors = [{isError:chatDetails.isError,
                  error:chatDetails.error},
                  {isError:oldMessagesChunk.isError,
                  error:oldMessagesChunk.error}
                ];

  const members = chatDetails.data?.chat?.members;

  const messageOnChange = (e)=>{
    setMessage(e.target.value);

    if(!iAmTyping){
      socket.emit(START_TYPING,{members,chatId});
      setIAmTyping(true);
    }

    if(typingTimeout.current) clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(()=>{
      socket.emit(STOP_TYPING,{members,chatId});
      setIAmTyping(false);
    },2000)
  }

  const handleFileOpen = (e)=>{
    dispatch(setIsFileMenu(true));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!message.trim()) return;
//  Emitting the messages to the server
    socket.emit(NEW_MESSAGE,{chatId,members,message});
    setMessage("");

    // As user sent the message so remove the typing loader field
    if(iAmTyping){
      socket.emit(STOP_TYPING,{members,chatId});
      setIAmTyping(false);
      clearTimeout(typingTimeout.current);
    }
  };

  useEffect(()=>{
    dispatch(removeNewMessagesAlert(chatId));

    return ()=>{
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    }
  },[chatId,dispatch,socket])

  

  useEffect(()=>{
    if(bottomRef.current){ 
      bottomRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[messages,userTyping])

  useEffect(() => {
    if (chatDetails.isError) {
      navigate('/');
    }
  }, [chatDetails.isError]);

  const newMessagesListener = useCallback((data)=>{
    if(data.chatId !== chatId) return;
    setMessages((prev)=>[...prev,data.message]);
 
  },[chatId]);

  const startTypingListener = useCallback((data)=>{
    if(data.chatId !== chatId) return;
    setUserTyping(true);
  },[chatId]);

  const stopTypingListener = useCallback((data)=>{
    if(data.chatId !== chatId) return;
    setUserTyping(false);
  },[chatId]);

  const alertListener = useCallback((data)=>{
    if(data.chatId !== chatId ) return;
      const messageForAlert = {
        content:data.message,
        sender:{
            _id:"dsfbjsbfdsbfjshbfdhbsdfb",
            name:"Admin"
        },
        chat:chatId,
        createdAt:new Date().toISOString(),
      }

    setMessages((prev)=>[...prev,messageForAlert]);
},[chatId]);


  

  const eventHandler={
    [ALERT]:alertListener,
    [NEW_MESSAGE]:newMessagesListener,
    [START_TYPING]:startTypingListener,
    [STOP_TYPING]:stopTypingListener,
  };

  useSocketEvents(socket,eventHandler);

  useErrors(errors);

  const allMessages = [...oldMessages,...messages];
  

  return chatDetails.isLoading?<div>Loading...</div>:(
    <div className="flex flex-col  w-full h-full bg-[#1a1a1a] text-white p-4 overflow-hidden">
      {/* Message */}
      <div ref={containerRef} className="flex-1 overflow-y-auto mb-4">
        {/* Example message - replace with dynamic data */}
        {
           allMessages.length>0 && allMessages.map((i)=>(
              <MessageComponent message={i} user={user} key={i._id}/>
            ))
        }
        {
          userTyping && <TypingLoader/>
        }

        <div ref={bottomRef}/>
      </div>
      <form style={{height:"10%"}} onSubmit={handleSubmit} className="flex items-center h-12 border-2 border-gray-600 rounded-md p-1 bg-gray-700">

          {
            isFileMenu && (
              <div className='absolute bottom-20 left-4 z-50 mb-2'>
                <FileMenu chatId={chatId}/>
              </div>
            )
          }

          <button type="button" onClick={handleFileOpen} className="mr-2 text-white">
              <GrAttachment size={20} />
          </button>

          <input type="text" 
                  value={message}
                  onChange={messageOnChange}
                  placeholder="Type Message Here..."
                  className="flex-1 bg-gray-700 text-white p-4 rounded-lg focus:outline-none  mr-2"
          />

        <button type="submit"
          disabled={!message.trim()}
          className="text-blue-400 hover:text-blue-300 disabled:text-gray-500 disabled:cursor-not-allowed p-2 rounded-full transition-colors duration-200"
        >
          <BsFillSendFill size={20} />
        </button>

      </form>
    </div>
  )
}

export default appLayout()(Chat)