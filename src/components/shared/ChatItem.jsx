import {Link} from 'react-router-dom'
import AvatarCard from './AvatarCard'

const ChatItem = ({
                    avatar=[],
                    name,
                    _id,
                    groupChat=false,
                    isOnline
                    ,newMessageAlert
                    ,onOptionsOpen}
                  
) => {return (
    <Link to={`/chat/${_id}`} onContextMenu={(e)=>{onOptionsOpen(e,{ _id, name, isGroup: groupChat })}} 
      className="flex items-center min-h-[72px] justify-between hover:bg-[#252525] transition-colors w-full p-4" >
        <div className="flex items-center gap-4">
            <AvatarCard avatar={avatar}/>
          <div className="flex flex-col justify-center">
              <p className="text-gray-400 text-base font-medium leading-normal line-clamp-1">{name}</p>
                {newMessageAlert.count > 0 &&
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                        {newMessageAlert.count} New Message
                  </p>
                }
          </div>
          {
            isOnline && (
              <p className="text-[#4a9168] text-sm font-normal leading-normal ">Online</p>
            )
          }
        </div>
    </Link>
  )
}

export default ChatItem