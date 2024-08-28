import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    resetFormValue,
    setCustomerList,
    setCustomerListTotal,
    setFormValue
} from "../Redux/state-slice/customer-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const customerListRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/CustomerList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setCustomerList(res.data['data'][0]['Rows']));
                store.dispatch(setCustomerListTotal(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setCustomerList([]));
                store.dispatch(setCustomerListTotal(0));
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

export const CreateNewCustomer=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createCustomer";
        if(objectId!==0){
             url=BaseUrl+"/UpdateCustomers/"+objectId;
        }
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if( res.data['status']==='success')
            {
                store.dispatch(resetFormValue())
                toast.success("Customer creation successfull");
                store.dispatch(hideLoader());
                return true;
            }
            else {
                toast.error("Mobile Number already exist. ");
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

export const FillUpFormRequest=async (objectId )=>{
     try{
         const url=BaseUrl+"/customerDetailsById/"+objectId;
         const res=await axios.get(url,axiosHeader);
         if(res.status===200 && res.data['status']==='success'){
                 store.dispatch(setFormValue({name:"customerName",value:res.data['data'][0]['customerName']}))
                 store.dispatch(setFormValue({name:"email",value:res.data['data'][0]['email']}))
                 store.dispatch(setFormValue({name:"phone",value:res.data['data'][0]['phone']}))
                 store.dispatch(setFormValue({name:"address",value:res.data['data'][0]['address']}))
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

export const DeleteCustomerRequest=async (objectId)=>{
    try{
        const url=BaseUrl+'/DeleteCustomer/'+objectId;
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