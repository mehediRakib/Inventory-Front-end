import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    resetFormValue,
    setFormValue,
    setSupplierList,
    setSupplierListTotal
} from "../Redux/state-slice/suppliers-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const SupplierListRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/SupplierList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setSupplierList(res.data['data'][0]['Rows']));
                store.dispatch(setSupplierListTotal(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setSupplierList([]));
                store.dispatch(setSupplierListTotal(0));
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


export const CreateNewSupplier=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createSuppliers";
        if(objectId!==0){

            url=BaseUrl+"/UpdateSuppliers/"+objectId;
        }
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if( res.data['status']==='success')
            {

                store.dispatch(resetFormValue())
                toast.success("Supplier creation successfull");
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
        const url=BaseUrl+"/suppliersDetailsById/"+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setFormValue({name:"supplierName",value:res.data['data'][0]['supplierName']}))
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


export const DeleteSupplierRequest=async (objectId)=>{
    try{
        const url=BaseUrl+'/DeleteSuppliers/'+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='associate'){
            toast.error(res.data['data']);
            return  false;
        }
        else if(res.status===200 && res.data['status']==='success'){
            toast.success("Supplier delete successfull");
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