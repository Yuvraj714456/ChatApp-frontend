import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIVE_USERS, GET_ACTIVE_USERS, NEW_MESSAGE_ALERT, NEW_REQUEST, REFETCH_CHATS } from '../../constant/events';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { getOrSaveFromLocalStorage } from '../../lib/features.jsx';
import { useMyChatsQuery } from '../../redux/api/api';
import { incrementNotification, setNewMessagesAlert } from '../../redux/reducers/chat.js';
import { useSocket } from '../../socket';
import ChatList from '../specific/ChatList';
import NewGroups from '../specific/NewGroups';
import Notification from '../specific/Notification';
import Search from '../specific/Search';
import Header from './Header';
import { setIsActiveusers } from '../../redux/reducers/misc.js';
import MyProfile from '../specific/MyProfile.jsx';


const appLayout = () => (WrappedComponent)=>{
    return (props)=>{
        const params = useParams(); 
        const navigate=useNavigate();
        const chatId = params.id;
        const  socket = useSocket();
        const dispatch = useDispatch();


        const {user} = useSelector((state)=>state.auth);
        const {isMobile,isSearch,isNotification,isNewGroup,isMyProfile}= useSelector((state)=>state.misc);
        const {newMessagesAlert} = useSelector((state)=>state.chat);

        const {isLoading,data,isError,error,refetch} = useMyChatsQuery(""); 

        useErrors([{isError,error}]);

        useEffect(() => {
            getOrSaveFromLocalStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert});
        }, [newMessagesAlert])

        useEffect(()=>{
            socket.emit(GET_ACTIVE_USERS);
        },[user._id,socket])

        const newMessageAlertListener = useCallback((data)=>{
            if( chatId && chatId === data.chatId) return;
            dispatch(setNewMessagesAlert(data));
        },[chatId])

        const newRequestListener = useCallback(()=>{
            dispatch(incrementNotification())
        },[dispatch])

        const refetchListener = useCallback(()=>{
            refetch();
            navigate('/')
        },[refetch,navigate])

        const activeUsersListener = useCallback((activeUsers)=>{
                    dispatch(setIsActiveusers(activeUsers));
          },[chatId])
        

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]:newMessageAlertListener,
            [NEW_REQUEST]:newRequestListener,
            [REFETCH_CHATS]:refetchListener,
            [ACTIVE_USERS]:activeUsersListener,
        }

        useSocketEvents(socket,eventHandlers);
    return (
        <div className="flex flex-col h-screen bg-[#0f0f0f]">
            <Header/>
            <div className="flex flex-1 overflow-hidden">
                {!isMobile && <div className="w-[30.33%]  h-full bg-[#F0F0F0] block sm:hidden lg:hidden">
                        {
                            isLoading?<div>Loading...</div>:<ChatList 
                                                                chats={data?.message} 
                                                                chatId={chatId} 
                                                                newMessagesAlert={newMessagesAlert}
                                                            />
                        }
                        </div>
                }
                <div className='hidden sm:block lg:block w-[30.33%] bg-[#F0F0F0]'>
                    {isLoading?<div>Loading...</div>:<ChatList
                            chats={data?.message} 
                            chatId={chatId} 
                            newMessagesAlert={newMessagesAlert}
                   />}
                </div>
                <div className="flex-1 bg-[#1a1a1a] text-gray-500 overflow-y-auto w-full">
                            <WrappedComponent {...props} chatId={chatId} user={user}/>
                </div>
            </div>
           {(isSearch || isNotification || isNewGroup || isMyProfile) && (
                <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="relative pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    {isSearch && <Search />}
                    {isNotification && <Notification />}
                    {isNewGroup && <NewGroups />}
                    {isMyProfile && <MyProfile />}
                    </div>
                </div>
            )}
        </div>
    );
    
}
}

export default appLayout
