import React from 'react'

const AvatarCard = ({avatar, size=48}) => {
  return (
        <div className='rounded-full overflow-hidden border-2 border-black'
            style={{width:size,height:size}}>
              <img 
                src={avatar} 
                alt="avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://static.vecteezy.com/system/resources/thumbnails/036/280/654/small_2x/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg';
              }}/>
        </div>
  )
}

export default AvatarCard