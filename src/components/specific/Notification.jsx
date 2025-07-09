import { CiCircleRemove } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useGetNotificationQuery, useHandleFriendRequestMutation } from '../../redux/api/api';
import { setIsNotification } from '../../redux/reducers/misc';
import AvatarCard from '../shared/AvatarCard';

const Notification = () => {
  const {isNotification} = useSelector(state=>state.misc); 

  const {isLoading,data,isError,error}=useGetNotificationQuery();

  const dispatch = useDispatch();

  const [handleRequest] = useAsyncMutation(useHandleFriendRequestMutation);

  


  const friendRequestHandler= async ({_id,handle})=>{
    dispatch(setIsNotification(false));

     await handleRequest("Accepting...",{requestId:_id,handle});
  }

  const closeHandler = ()=>dispatch(setIsNotification(!isNotification));

  useErrors([{error,isError}]);

  return (
      <div className=" p-6 bg-gray-900 text-white rounded-lg shadow-lg w-[550px] border border-gray-700">
        <div className='flex justify-between items-center'>
          <h2 className="text-lg font-semibold mb-4">Notification</h2>
          <button
            className="text-red-500 hover:text-[#ffffff] text-4xl mb-4"
            onClick={closeHandler}
          >
            ×
          </button>
        </div>
        {
          data?.allRequest && data?.allRequest.length>0 ?
          (data.allRequest?.map((user)=> <NotificationItem sender={user.sender} _id={user._id} handler=
                {friendRequestHandler} key={user._id}/>)):
          <div className="text-center text-gray-400">No Notification</div>
        }
      </div>
    
  )
}

const NotificationItem = ({sender,_id,handler})=>{
        const {name='',avatar=''} = sender||{};
        return (
            <div className="flex items-center p-2 border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200">
                  <AvatarCard avatar={avatar}/>
                  <div className="flex-1 text-white pl-4">{`${name} sent you a friend request`}</div>
                  <div className="flex space-x-2">
                      <div onClick={()=>handler({_id,handle:true})} className="text-green-400 hover:text-green-300 p-2 rounded-full transition-colors duration-200"><IoMdAddCircleOutline size={20}/></div>
                      <div onClick={()=>handler({_id,handle:false})} className="text-red-400 hover:text-red-300 p-2 rounded-full transition-colors duration-200"><CiCircleRemove size={20}/></div>
                  </div>
          </div>
    )
}

export default Notification