
import {createSlice} from "@reduxjs/toolkit";

export const productSlice=createSlice({
    name:'product',
    initialState:{
        List:[],
        TotalProductList:0,
        BrandListDropDown:[],
        CategoryListDropDown:[],
        FormValue:{
            categoryID:"",
            brandID:"",
            name:"",
            unit:"",
            price:"",
            details:""
        }
    },
    reducers:{
        setProductList:(state,action)=>{
            state.List=action.payload;
        },
        setTotalProductList:(state,action)=>{
            state.TotalProductList=action.payload
        },
        setBrandListDropDown:(state,action)=>{
            state.BrandListDropDown=action.payload;
        },
        setCategoryListDropDown:(state,action)=>{
            state.CategoryListDropDown=action.payload
        },
        setFormValue:(state,action)=>{
            state.FormValue[`${action.payload['name']}`]=action.payload['value'];
        },
        resetFormValue:(state,action)=>{
            Object.keys(state.FormValue).forEach((i)=>state.FormValue[i]="");
        }

    }
});

export const {setProductList,setTotalProductList,setBrandListDropDown,setCategoryListDropDown,setFormValue,resetFormValue}=productSlice.actions
export default productSlice.reducer;