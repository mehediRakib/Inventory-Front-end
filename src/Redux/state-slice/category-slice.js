import {createSlice} from "@reduxjs/toolkit";

export const categorySlice=createSlice({
    name:'category',
    initialState:{
        List:[],
        categoryListTotal:0,
        FormValue:{
            name:""
        },
    },
    reducers:{
        setCategoryList:(state,action)=>{
            state.List=action.payload
        },
        setCategoryListTotal:(state,action)=>{
            state.categoryListTotal=action.payload
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value']
        },
        resetFormValue:(state,action)=>{
            state.FormValue.name=""
        }
    }
})

export const {setCategoryList,setCategoryListTotal,setFormValue,resetFormValue}=categorySlice.actions;
export default categorySlice.reducer;