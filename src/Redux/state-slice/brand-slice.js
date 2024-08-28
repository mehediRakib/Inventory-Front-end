import {createSlice} from "@reduxjs/toolkit";
export const brandSlice=createSlice({
    name:'brand',
    initialState:{
        List:[],
        brandListTotal:0,
        FormValue:{
            name:""
        },
    },

    reducers:{
        setBrandList:(state,action)=>{
            state.List=action.payload;
        },
        setBrandListTotal:(state,action)=>{
            state.brandListTotal=action.payload;
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value']
        },
        resetFormValue:(state,action)=>{
            state.FormValue.name=""
        }
    }
})

export const {setBrandList,setBrandListTotal,setFormValue,resetFormValue}=brandSlice.actions;
export default brandSlice.reducer