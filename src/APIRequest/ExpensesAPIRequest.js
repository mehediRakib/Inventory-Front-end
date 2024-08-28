import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    setExpenseList,
    setExpenseTypelistDropdown,
    setFormValue,
    setTotalExpenseList
} from "../Redux/state-slice/expense-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const expenseApiRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/ExpensesList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setExpenseList(res.data['data'][0]['Rows']));
                store.dispatch(setTotalExpenseList(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setExpenseList([]));
                store.dispatch(setTotalExpenseList(0));
                toast.error('No Data Found')
            }

        }
        else {
            toast.error("Something went wrong")
        }

    }catch (e) {
        toast.error("Something went wrong");
    }

}

export const ExpenseTypeListDropDown=async ()=>{
    try{
        const url=BaseUrl+"/ExpenseTypesDropDown";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'].length>0){
                store.dispatch(setExpenseTypelistDropdown(res.data['data']));
            }
            else {
                store.dispatch(setExpenseTypelistDropdown([]))
                toast.error("No category found")
            }
        }
        else {
            toast.error("Something went wrong")
        }

    }
    catch (e) {
        toast.error("Something went wrong");
    }
}

export const CreateUpdateExpenseListRequest=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createExpense";
        if(objectId!==0){
            url=BaseUrl+"/UpdateExpense/"+objectId;
        }
        const res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if(res.data['status']==='success'){
                toast.success("Expense creation successfull");
                store.dispatch(hideLoader());
                return true;
            }else {
                toast.error("Something went wrong");
                store.dispatch(hideLoader());
                return false;
            }
        }else {
            toast.error("Something went wrong");
            store.dispatch(hideLoader());
            return false;
        }
    }catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader());
    }
}

export const FillupFormExpenseRequest=async (objectId)=>{
    try{
        const url=BaseUrl+"/expenseDetailsById/"+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setFormValue({name:'expenseTypeID',value:res.data['data'][0]['expenseTypeID']}))
            store.dispatch(setFormValue({name:'Amount',value:res.data['data'][0]['Amount']}))
            store.dispatch(setFormValue({name:'Note',value:res.data['data'][0]['Note']}))
        }
        else {
            toast.error("Request Fail! Please try again")

        }


    }catch (e) {
        toast.error("Something went wrong");
        return false;

    }
}

export const DeleteExpenseRequest=async (objectId)=>{
    try{
        const url=BaseUrl+'/DeleteExpense/'+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='associated'){
            toast.error(res.data['data']);
            return  false;
        }
        else if(res.status===200 && res.data['status']==='success'){
            toast.success("Product delete successfull");
            return true
        }
        else {
            toast.error('Request fail! please try again');
            return false;
        }
    }catch (e) {
        toast.error("Something went wrong");
        return false;
    }
}


