import React ,{useRef}from 'react'
import { CiImageOn } from "react-icons/ci"
import { MdOndemandVideo } from "react-icons/md"
import { FaRegFileAudio, FaRegFileAlt } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { setIsFileMenu, setIsUploadingLoader } from '../../redux/reducers/misc'
import toast from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/api/api'

const FileMenu = ({chatId}) => {

  const dispatch = useDispatch();

  const inputRefs = useRef([]);

  const [sendAttachments] = useSendAttachmentsMutation();
  

  const handleClose = ()=>{
      dispatch(setIsFileMenu(false));
  }

  const handleTrigger=(index)=>{
    inputRefs.current[index]?.click();
  }

  const handleFileChange = async (e,key)=>{
    const files = e.target.files;
    if(files.length<=0) return;

    if(files.length>5) return toast.error(`You can upload only 5 ${key} at a time`);

    dispatch(setIsUploadingLoader(true));

    const toastId = toast.loading(`Sending ${key}...`);
    handleClose();

    
    try{
        const myForm = new FormData();

        myForm.append("chatId",chatId)
        Array.from(files).forEach((file) => myForm.append("files", file));

      // fetching here
      const res = await sendAttachments({data:myForm});

      if(res.data){
        toast.success(`${key} sent successfully`,{id:toastId});
      }else{
        toast.error(`Failed to sent ${key}`,{id:toastId})
      }
    }catch(err){
        toast.error(err,{id:toastId});
    }finally{
        dispatch(setIsUploadingLoader(false));
    }
  }

  const fileOptions = [
    { icon: <CiImageOn size={24} />, label: "Image", accept:"image/png, image/jpeg, image/gif"  },
    { icon: <MdOndemandVideo size={24} />, label: "Video" ,accept:"video/mp4, video/webm, video/ogg"},
    { icon: <FaRegFileAudio size={24} />, label: "Audio" ,accept:"audio/mpeg, audio/wav, audio/ogg"},
    { icon: <FaRegFileAlt size={24} />, label: "File", accept:"*" },
  ]



  return (
    <div className="w-44 bg-gray-900 text-white rounded-lg shadow p-3 space-y-2">
      <div className='flex justify-between items-center'>
        <h2 className="font-semibold mb-2 text-center text-xl">Upload files</h2>
        <button
              className="text-red-500 hover:text-[#ffffff] text-4xl mb-4"
              onClick={handleClose}
            >
              ×
        </button>
      </div>
      {fileOptions.map((item, index) => (
        <div 
          key={index} 
          className="flex items-center gap-2 cursor-pointer hover:bg-gray-500 p-2 rounded"
          onClick={()=>handleTrigger(index)}
          >
          {item.icon}
          <span className="text-sm">{item.label}</span>
          <input
            ref={el=>inputRefs.current[index]=el} 
            type="file" 
            multiple
            accept={item.accept} 
            style={{display:'none'}}
            onChange={(e)=>handleFileChange(e,item.label)}
          />
        </div>
      ))}
    </div>
  )
}

export default FileMenu
