import {createSlice} from "@reduxjs/toolkit";

export const customerSlice=createSlice({
    name:'customer',
    initialState:{
        List:[],
        TotalCustomer:0,
        FormValue:{
            customerName:"",
            email:"",
            phone:"",
            address:""
        }
    },
    reducers:{
        setCustomerList:(state,action)=>{
            state.List=action.payload
        },
        setCustomerListTotal:(state,action)=>{
            state.TotalCustomer=action.payload
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value'];
        },
        resetFormValue:(state)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
});

export const {setCustomerList,setCustomerListTotal,setFormValue,resetFormValue}=customerSlice.actions;
export default customerSlice.reducer;