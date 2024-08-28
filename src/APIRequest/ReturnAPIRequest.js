import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    resetReturnFormValue,
    setCustomerListDropdown,
    setProductListDropdown,
    setReturnList,
    setTotalRetunList
} from "../Redux/state-slice/return-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const ReturnApiRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/returnList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setReturnList(res.data['data'][0]['Rows']));
                store.dispatch(setTotalRetunList(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setReturnList([]));
                store.dispatch(setTotalRetunList(0));
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
export const CustomerListDropdownRequest=async()=>{
    try{
        const url=BaseUrl+"/CustomerDropDown";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'].length>0){
                store.dispatch(setCustomerListDropdown(res.data['data']));
            }else {
                store.dispatch(setCustomerListDropdown([]));
                toast.error('No Customer found');
            }

        }else {
            toast.error("Something went wrong")
        }

    }catch (e) {
        toast.error("Something went wrong")
    }
}

export const ProductListDropdownRequest=async()=>{
    try{
        const url=BaseUrl+"/ProductListDropdown";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'].length>0){
                store.dispatch(setProductListDropdown(res.data['data']));
            }else {
                store.dispatch(setProductListDropdown([]));
                toast.error('No Product found');
            }

        }else {
            toast.error("Something went wrong")
        }

    }catch (e) {
        toast.error("Something went wrong")
    }
}

export const CreateReturnRequest=async (Parent,Child)=>{
    try{
        store.dispatch(showLoader());
        const postBody={Parents:Parent,Child:Child};
        let url=BaseUrl+"/createReturn";
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if( res.data['status']==='success')
            {
                store.dispatch(resetReturnFormValue())
                toast.success("Return creation successfull");
                store.dispatch(hideLoader());
                return true;
            }
            else {
                toast.error("Request fail. Please try again");
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