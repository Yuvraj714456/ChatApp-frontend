import { transformImage } from '../../lib/features'

const renderAttachment = (file,url) => {
 
    if(file=="video") 
       return <video src={url} preload='none' width={'200px'} controls/>

    if(file=="image") 
        return <img src={transformImage(url,200)} height={'150px'} width={'200px'} style={{objectFit:"contain"}}/>

    if(file=="audio") 
        return <audio src={transformImage(url,200)}preload='none' controls/>

    else{
        return (
                <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-white underline hover:text-gray-300"
                >
                📄 Download File
                </a>
            );
    }
  
}

export default renderAttachment