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
      className="flex items-center bg-[#f0f0f0] px-4 min-h-[72px] py-2 justify-between hover:bg-[#d3d6d8] transition-colors w-full">
        <div className="flex items-center gap-4">
            <AvatarCard avatar={avatar}/>
          <div className="flex flex-col justify-center">
              <p className="text-black text-base font-medium leading-normal line-clamp-1">{name}</p>
                {newMessageAlert.count > 0 &&
                  <p className="text-[#9dabb8] text-sm font-normal leading-normal line-clamp-2">
                        {newMessageAlert.count} New Message
                  </p>
                }
          </div>
          {
            isOnline && (
              <p className="text-[#4a9168] text-sm font-normal leading-normal">Online</p>
            )
          }
        </div>
    </Link>
  )
}

export default ChatItem