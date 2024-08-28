
import {createSlice} from "@reduxjs/toolkit";

export const returnSlice=createSlice({
    name:'sale',
    initialState:{
        List:[],
        TotalReturnList:0,
        CustomerListDropdown:[],
        ProductListDropdown:[],
        ReturnFormValue:{
            customerID:"",
            VatTax:"",
            shippingCost:"",
            discount:"",
            grandTotal:"",
            otherCost:"",
            note:""
        },
        ReturnItemList:[]
    },
    reducers:{
        setReturnList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalRetunList:(state,action)=>{
            state.TotalReturnList=action.payload
        },
        setCustomerListDropdown:(state,action)=>{
            state.CustomerListDropdown=action.payload
        },
        setProductListDropdown:(state,action)=>{
            state.ProductListDropdown=action.payload
        },
        setReturnFormValue:(state,action)=>{
            state.ReturnFormValue[`${action.payload['name']}`]=action.payload['value'];
        },
        setReturnItemList:(state,action)=>{
            state.ReturnItemList.push(action.payload)
        },
        removeReturnItemList:(state,action)=>{
            state.ReturnItemList.splice(action.payload,1)
        },
        resetReturnFormValue:(state,action)=>{
            state.ReturnItemList=[];
            Object.keys(state.ReturnFormValue).forEach((i)=>state.ReturnFormValue[i]="")
        }
    }
});

export const {setReturnList,setTotalRetunList,setCustomerListDropdown,setProductListDropdown,setReturnFormValue,setReturnItemList,removeReturnItemList,resetReturnFormValue}=returnSlice.actions
export default returnSlice.reducer;