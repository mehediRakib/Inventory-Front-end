
import {createSlice} from "@reduxjs/toolkit";

export const saleSlice=createSlice({
    name:'sale',
    initialState:{
        List:[],
        TotalSaleList:0,
        CustomerListDropdown:[],
        ProductListDropdown:[],
        SaleFormValue:{
            customerID:"",
            VatTax:"",
            shippingCost:"",
            discount:"",
            grandTotal:"",
            otherCost:"",
            note:""
        },
        SaleItemList:[]
    },
    reducers:{
        setSaleList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalSaleList:(state,action)=>{
            state.TotalSaleList=action.payload
        },
        setCustomerListDropdown:(state,action)=>{
            state.CustomerListDropdown=action.payload
        },
        setProductListDropdown:(state,action)=>{
            state.ProductListDropdown=action.payload
        },
        setSaleFormValue:(state,action)=>{
            state.SaleFormValue[`${action.payload['name']}`]=action.payload['value'];
        },
        setSaleItemList:(state,action)=>{
            state.SaleItemList.push(action.payload)
        },
        removeSaleItemList:(state,action)=>{
            state.SaleItemList.splice(action.payload,1)
        },
        resetSaleFormValue:(state,action)=>{
            state.SaleItemList=[];
            Object.keys(state.SaleFormValue).forEach((i)=>state.SaleFormValue[i]="")
        }
    }
});

export const {setSaleList,setTotalSaleList,setCustomerListDropdown,setProductListDropdown,setSaleFormValue,setSaleItemList,removeSaleItemList,resetSaleFormValue}=saleSlice.actions
export default saleSlice.reducer;