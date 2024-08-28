
import {createSlice} from "@reduxjs/toolkit";

export const expenseSlice=createSlice({
    name:'expense',
    initialState:{
        List:[],
        TotalExpenseList:0,
        ExpenseTypelistDropdown:[],
        FormValue:{
            expenseTypeID:"",
            Amount:0,
            Note:"",
        }
    },
    reducers:{
        setExpenseList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalExpenseList:(state,action)=>{
            state.TotalExpenseList=action.payload
        },
        setExpenseTypelistDropdown:(state,action)=>{
            state.ExpenseTypelistDropdown=action.payload;
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value']
        },
        resetFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i]="")
        }
    }
});

export const {setExpenseList,setTotalExpenseList,setExpenseTypelistDropdown,setFormValue,resetFormValue}=expenseSlice.actions
export default expenseSlice.reducer;