import {createSlice} from "@reduxjs/toolkit";

export const reportSlice=createSlice({
    name:"Report",
    initialState:{
        ExpenseByDateList:[],
        ReturnByDateList:[],
        PurchaseByDateList:[],
        SalesByDateList:[],

    },
    reducers:{
        setExpenseByDateList:(state,action)=>{
            state.ExpenseByDateList=action.payload
        },
        setReturnByDateList:(state,action)=>{
            state.ReturnByDateList=action.payload
        },
        setPurchaseByDateList:(state,action)=>{
            state.PurchaseByDateList=action.payload
        },
        setSalesByDateList:(state,action)=>{
            state.SalesByDateList=action.payload
        },

    }
})

export const {setExpenseByDateList,setReturnByDateList,setPurchaseByDateList,setSalesByDateList}=reportSlice.actions;
export default reportSlice.reducer