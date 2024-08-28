import {createSlice} from "@reduxjs/toolkit";
export const settingsSlice=createSlice({
    name:'settings',
    initialState:{
        loader:"d-none",
        activeValue:"",
        checkItemValue:""
    },
    reducers:{
        ShowLoader:(state)=>{
            state.loader=""
        },
        HideLoader:(state)=>{
            state.loader="d-none"
        },
        setActiveValue:(state,action)=>{
           state.activeValue=action.payload
        },
        setCheckItemActiveValue:(state,action)=>{
            state.checkItemValue=action.payload
        }
    }
})
export  const {ShowLoader,HideLoader,setActiveValue,setCheckItemActiveValue}=settingsSlice.actions;
export default  settingsSlice.reducer;