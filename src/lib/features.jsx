import moment from "moment";


const fileFormat = (url="")=>{
    const  fileExtension = url.split('.').pop();
    if(fileExtension === "mp4" || fileExtension === "webm" || fileExtension==='ogg'){
        return "video";
    }

    if(fileExtension === "mp3" || fileExtension === "wav" ){
        return "audio";
    }

    if(fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif"){
        return "image";
    }

    return 'file';
}

const transformImage =(url="",width=100)=>{
    const newUrl = url.replace("upload/",`upload/dpr_auto/w_${width}/`);
    return newUrl;
}

const getLast7Days = () => {
  const last7days = [];

  for (let i = 6; i >= 0; i--) {
    const dayDate = moment().subtract(i, "days").format("MMM DD");
    last7days.push(dayDate);
  }

  return last7days;
};

const getOrSaveFromLocalStorage= ({key,value,get=false})=>{
    if(get){
        try {
            const data=localStorage.getItem(key);
            return data?JSON.parse(data):null;
        } catch (error) {
            console.warn(`Invalid JSON in localStorage for key "${key}"`,error);
            localStorage.removeItem(key);
            return null;
        }
    }else{
        localStorage.setItem(key,JSON.stringify(value));
    }                
}

export {fileFormat,transformImage,getLast7Days,getOrSaveFromLocalStorage};