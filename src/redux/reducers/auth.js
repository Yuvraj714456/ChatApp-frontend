import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:null,
    isAdmin:false,
    loader:true,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
       userExists:(state,action)=>{
            state.user=action.payload,
            state.loader=false;
       },
       userNotExists:(state,action)=>{
            state.user=null;
            state.loader=false;
       },
       adminExist:(state,action)=>{
            state.isAdmin=true;
            state.loader=false;
       },
       adminNotExist:(state,action)=>{
        state.isAdmin=false;
        state.loader=false
       }
    }
});


export default authSlice;

export const {userExists,userNotExists,adminExist,adminNotExist}=authSlice.actions;