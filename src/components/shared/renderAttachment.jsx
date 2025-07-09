import React from 'react'
import { transformImage } from '../../lib/features'
import fileMenu from '../dialog/fileMenu'

const renderAttachment = (file,url) => {
 
    if(file=="video") 
       return <video src={url} preload='none' width={'200px'} controls/>

    if(file=="image") 
        return <img src={transformImage(url,200)} height={'150px'} width={'200px'} style={{objectFit:"contain"}}/>

    if(file=="audio") 
        return <audio src={transformImage(url,200)}preload='none' controls/>

    else{
        return <fileMenu/>
    }
  
}

export default renderAttachment