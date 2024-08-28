import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    resetFormValue,
    setExpenseTypeList,
    setFormValue,
    setTotalExpenseTypeList
} from "../Redux/state-slice/expenseType-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const expenseTypeApiRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/ExpenseTypesList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setExpenseTypeList(res.data['data'][0]['Rows']));
                store.dispatch(setTotalExpenseTypeList(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setExpenseTypeList([]));
                store.dispatch(setTotalExpenseTypeList(0));
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

export const CreateNewAndUpdateCustomer=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createExpenseTypes";
        if(objectId!==0){
            url=BaseUrl+"/UpdateExpenseTypes/"+objectId;
        }
        let res=await axios.post(url,postBody,axiosHeader);

        if(res.status===200 && res.data['status']==='success')
            {
                store.dispatch(resetFormValue())
                toast.success("Expense Type creation successfull");
                store.dispatch(hideLoader());
                return true;
            }
        else {
            toast.error("Something went wrong");
            store.dispatch(hideLoader());
            return false;
        }

    }catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader());

    }

}

export const FillUpFormRequest=async (objectId )=>{
    try{
        const url=BaseUrl+"/expenseTypesDetailsById/"+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setFormValue({name:"name",value:res.data['data'][0]['name']}))
            return true;
        }else {
            toast.error("Request fail! Please try again");
            return false;
        }

    }catch (e) {
        toast.error('Something went wrong');
        return false;
    }
}

export const DeleteExpenseTypeRequest=async (objectId)=>{
    try{
        const url=BaseUrl+'/DeleteExpenseTypesById/'+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='associate'){
            toast.error(res.data['data']);
            return  false;
        }
        else if(res.status===200 && res.data['status']==='success'){
            toast.success("Customer delete successfull");
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