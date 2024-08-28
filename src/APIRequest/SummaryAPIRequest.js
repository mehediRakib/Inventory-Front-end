import {store} from "../Redux/store/store.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
import {BaseUrl} from "../Helper/config.js";

import axios from "axios";
import {
    SetExpenseChart,
    SetExpenseTotal,
    SetPurchaseChart, SetPurchaseTotal, SetReturnChart, SetReturnTotal,
    SetSaleChart,
    SetSaleTotal
} from "../Redux/state-slice/dashboard-slice.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
const AxiosHeader={headers:{'token':getToken()}}
export async function ExpensesSummary(){
    try {
        store.dispatch(showLoader())
        let URL=BaseUrl+"/ExpenseSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(SetExpenseChart(res.data['data'][0]['Last30days']))
            store.dispatch(SetExpenseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            toast.error("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        toast.error("Something Went Wrong")
    }
}

export async function SalesSummary(){
    try {
        store.dispatch(showLoader())
        let URL=BaseUrl+"/SalesSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(SetSaleChart(res.data['data'][0]['Last30days']))
            store.dispatch(SetSaleTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            toast.error("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        toast.error("Something Went Wrong")
    }
}

export async function PurchaseSummary(){
    try {
        store.dispatch(showLoader())
        let URL=BaseUrl+"/PurchaseSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(SetPurchaseChart(res.data['data'][0]['Last30days']))
            store.dispatch(SetPurchaseTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            toast.error("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        toast.error("Something Went Wrong")
    }
}

export async function ReturnSummary(){
    try {
        store.dispatch(showLoader())
        let URL=BaseUrl+"/ReturnSummary";
        let res=await axios.get(URL,AxiosHeader)
        store.dispatch(hideLoader())
        if(res.status===200){
            store.dispatch(SetReturnChart(res.data['data'][0]['Last30days']))
            store.dispatch(SetReturnTotal(res.data['data'][0]['Total'][0]['TotalAmount']))
        }
        else{
            toast.error("Something Went Wrong")
        }
    }
    catch (e){
        store.dispatch(hideLoader())
        toast.error("Something Went Wrong")
    }
}