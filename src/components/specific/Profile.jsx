import React from 'react'
import moment from 'moment'

const Profile = () => {
  return (
    <div>
      <img src="#" alt="" />
      <ProfileCard heading={"Bio"} text={"sadas belvwbhevhb jfrv"}/>
      <ProfileCard heading={"UserName"} text={"@fegfrvejv"}/>
      <ProfileCard heading={"Name"} text={"Alex"}/>
      <ProfileCard heading={"Joined"} text={moment("2023-11-04T18:30:00.000Z").fromNow()}/>
    </div>
  )
}

const ProfileCard =({text,Icon,heading})=>[
      <div>
        {Icon && Icon}

        <div>
          <div>{text}</div>
          <div>{heading}</div>
        </div>
      </div>
]

export default Profile