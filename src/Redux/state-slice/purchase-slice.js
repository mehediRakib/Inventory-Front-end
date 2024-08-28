
import {createSlice} from "@reduxjs/toolkit";

export const purchaseSlice=createSlice({
    name:'purchase',
    initialState:{
        List:[],
        TotalPurchaseList:0,
        SuppliersListDropdown:[],
        ProductListDropdown:[],
        PurchaseFormValue:{
            suppliersID:"",
            VatTax:"",
            shippingCost:"",
            discount:"",
            grandTotal:"",
            otherCost:"",
            note:""
        },
        PurchaseItemList:[]
    },
    reducers:{
        setPurchaseList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalPurchaseList:(state,action)=>{
            state.TotalPurchaseList=action.payload
        },
        setSuppliersListDropdown:(state,action)=>{
            state.SuppliersListDropdown=action.payload
        },
        setProductListDropdown:(state,action)=>{
            state.ProductListDropdown=action.payload
        },
        setPurchaseFormValue:(state,action)=>{
            state.PurchaseFormValue[`${action.payload['name']}`]=action.payload['value'];
        },
        setPurchaseItemList:(state,action)=>{
            state.PurchaseItemList.push(action.payload)
        },
        removePurchaseItemList:(state,action)=>{
            state.PurchaseItemList.splice(action.payload,1)
        },
        resetPurchaseFormValue:(state,action)=>{
            state.PurchaseItemList=[];
            Object.keys(state.PurchaseFormValue).forEach((i)=>state.PurchaseFormValue[i]="")
        }

    }
});

export const {setPurchaseList,setTotalPurchaseList,setSuppliersListDropdown,setProductListDropdown,setPurchaseFormValue,setPurchaseItemList,removePurchaseItemList,resetPurchaseFormValue}=purchaseSlice.actions
export default purchaseSlice.reducer;