import {createSlice} from "@reduxjs/toolkit";
export const supplierSlice=createSlice({
    name:'suppliers',
    initialState:{
        List:[],
        supplierListTotal:0,
        FormValue:{
            supplierName:"",
            email:"",
            phone:"",
            address:""
        }
    },
    reducers:{
        setSupplierList:(state,action)=>{
            state.List=action.payload;
        },
        setSupplierListTotal:(state,action)=>{
            state.supplierListTotal=action.payload;
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value'];
        },

        resetFormValue:(state)=>{
            Object.keys(state.FormValue).forEach((i) => state.FormValue[i] = "");
        }
    }
})

export const {setSupplierList,setSupplierListTotal,setFormValue,resetFormValue}=supplierSlice.actions;
export default supplierSlice.reducer