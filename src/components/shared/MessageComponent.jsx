import { memo } from 'react';
import { fileFormat } from '../../lib/features';
import renderAttachment from './renderAttachment';

const MessageComponent = ({message,user}) => {

    const {sender,content,attachments=[],createdAt} = message;
    const sameSender = sender?._id === user?._id;

  return (
    <div className={`flex flex-col ${sameSender ? 'items-end' : 'items-start'} mb-2`}>
            <div
                className={`max-w-[70%] p-2 rounded-lg ${
                sameSender
                    ? 'bg-blue-600 text-white ml-auto'
                    : 'bg-gray-700 text-white mr-auto'
                }`}
            >
                {!sameSender && <div className="text-[13px] font-medium text-green-300">{sender.name}</div>}
                {content && <div className="text-base break-words ">{content}</div>}

                {attachments.length>0 && attachments.map((attachment,index)=>{
                        const url=attachment.url;
                        const file =fileFormat(url);
                        return (<div key={index} className='mt-1'>
                            <a 
                                href={url} 
                                target="_blank" 
                                download 
                                rel='noopener noreferrer'
                                className='text-white underline hover:text-gray-300'
                                >{renderAttachment(file,url)}
                            </a>
                        </div>)
                }) }
            </div>
            
      </div>
  )
}

export default memo(MessageComponent)