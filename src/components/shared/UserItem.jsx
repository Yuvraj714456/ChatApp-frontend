import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdRemoveCircleOutline } from "react-icons/md";


const UserItem = ({user,handler,handlerIsLoading,isAdded=false}) => {
    const {name='',_id='',avatar=''} = user||{};
  return (
    <div className="flex items-center p-4 border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200">
        <img src={avatar} className="w-10 h-10 rounded-full object-cover mr-3" />
        <div className="flex-1 text-white">{name}</div>
        <div onClick={()=>handler(_id)} disabled={handlerIsLoading}
                className="text-white hover:text-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed p-2 rounded-full transition-colors duration-200">
            <div>{
                  isAdded?<MdRemoveCircleOutline size={20}/>:<IoMdAddCircleOutline size={20}/>
              }</div>
        </div>
    </div>
  )
}

export default UserItem 