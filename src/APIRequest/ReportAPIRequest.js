import toast from "react-hot-toast";

import {BaseUrl} from "../Helper/config.js";
import {getToken} from "../Helper/sessionHelper.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import {
    setExpenseByDateList,
    setPurchaseByDateList,
    setReturnByDateList,
    setSalesByDateList
} from "../Redux/state-slice/report-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeaders={headers:{'token':getToken()}}
export const ExpenseReportByDateRequest=async (FromDate,ToDate)=>{
    try{
        const url=BaseUrl+"/ExpensesByDate";
        store.dispatch(showLoader());
        const postBody = {
            FromDate: FromDate + "T00:00:00.000Z",
            ToDate: ToDate + "T00:00:00.000Z"
        };
        const res=await axios.post(url,postBody,axiosHeaders);
        store.dispatch(hideLoader());
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setExpenseByDateList(res.data['data']))
            return true;
        }
        else {
            toast.error("Request fail, Please try again");
            return false;
        }

    }
    catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
        return false
    }
}

export const PurchaseReportByDateRequest=async (FromDate,ToDate)=>{
    try{
        const url=BaseUrl+"/PurchaseByDate";
        store.dispatch(showLoader());
        const postBody = {
            FromDate: FromDate + "T00:00:00.000Z",
            ToDate: ToDate + "T00:00:00.000Z"
        };
        const res=await axios.post(url,postBody,axiosHeaders);
        store.dispatch(hideLoader());
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setPurchaseByDateList(res.data['data']))
            return true;
        }
        else {
            toast.error("Request fail, Please try again");
            return false;
        }

    }
    catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
        return false
    }
}

export const ReturnReportByDateRequest=async (FromDate,ToDate)=>{
    try{
        const url=BaseUrl+"/ReturnByDate";
        store.dispatch(showLoader());
        const postBody = {
            FromDate: FromDate + "T00:00:00.000Z",
            ToDate: ToDate + "T00:00:00.000Z"
        };
        const res=await axios.post(url,postBody,axiosHeaders);
        store.dispatch(hideLoader());
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setReturnByDateList(res.data['data']))
            return true;
        }
        else {
            toast.error("Request fail, Please try again");
            return false;
        }

    }
    catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
        return false
    }
}

export const SaleReportByDateRequest=async (FromDate,ToDate)=>{
    try{
        const url=BaseUrl+"/SalesByDate";
        store.dispatch(showLoader());
        const postBody = {
            FromDate: FromDate + "T00:00:00.000Z",
            ToDate: ToDate + "T00:00:00.000Z"
        };
        const res=await axios.post(url,postBody,axiosHeaders);
        store.dispatch(hideLoader());
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setSalesByDateList(res.data['data']))
            return true;
        }
        else {
            toast.error("Request fail, Please try again");
            return false;
        }

    }
    catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
        return false
    }
}