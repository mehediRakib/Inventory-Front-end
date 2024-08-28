
import {createSlice} from "@reduxjs/toolkit";

export const expenseTypeSlice=createSlice({
    name:'expenseType',
    initialState:{
        List:[],
        TotalExpenseTypeList:0,
        FormValue:{
            name:""
        }
    },
    reducers:{
        setExpenseTypeList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalExpenseTypeList:(state,action)=>{
            state.TotalExpenseTypeList=action.payload
        },
        setFormValue:(state,action)=>{
            state.FormValue[action.payload['name']]=action.payload['value']
        },
        resetFormValue:(state)=>{
            state.FormValue.name="";
        }
    }
});

export const {setExpenseTypeList,setTotalExpenseTypeList,setFormValue,resetFormValue}=expenseTypeSlice.actions
export default expenseTypeSlice.reducer;