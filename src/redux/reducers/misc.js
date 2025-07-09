import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isNewGroup:false,
    isAddMembers:false,
    isNotification:false,
    isMobile:true,
    isSearch:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    isMyProfile:false
    ,selectedDeleteChat:{
        chatId:"",
        groupChat:false,
    },
    activeUsers:[]
}


const miscSlice = createSlice({
    name:"misc",
    initialState,
    reducers:{
        setIsNewGroup:(state,action)=>{
            state.isNewGroup=action.payload
        },
        setIsAddMembers:(state,action)=>{
            state.isAddMembers=action.payload
        },
        setIsNotification:(state,action)=>{
            state.isNotification=action.payload
        },
        setIsMobile:(state,action)=>{
            state.isMobile=action.payload
        },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload
        },
        setIsFileMenu:(state,action)=>{
            state.isFileMenu=action.payload
        },
        setIsDeleteMenu:(state,action)=>{
            state.isDeleteMenu=action.payload
        },
        setIsUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload
        },
        setIsSelectedDeleteChat:(state,action)=>{
            state.selectedDeleteChat=action.payload
        },
        setIsActiveusers:(state,action)=>{
            state.activeUsers=action.payload
        },
        setIsMyProfile:(state,action)=>{
            state.isMyProfile=action.payload
        }
    }
});


export default miscSlice;


export const {
  setIsSelectedDeleteChat,
  setIsAddMembers,
  setIsDeleteMenu,
  setIsFileMenu,
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setIsUploadingLoader,
  setIsActiveusers,
  setIsMyProfile
} = miscSlice.actions;
