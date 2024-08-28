import {createSlice} from "@reduxjs/toolkit";

export const spinnerSlice=createSlice({
    name:'spinner',
    initialState:{
        value:false
    },
    reducers:{
       showLoader:(state)=>{
           state.value=true
       },
        hideLoader:(state)=>{
           state.value=false;
        }
    }
})

export default spinnerSlice.reducer;
export const {showLoader,hideLoader}=spinnerSlice.actions