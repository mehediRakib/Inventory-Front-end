import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    resetPurchaseFormValue,
    setProductListDropdown,
    setPurchaseList,
    setSuppliersListDropdown,
    setTotalPurchaseList
} from "../Redux/state-slice/purchase-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const PurchaseApiRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/purchaseList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setPurchaseList(res.data['data'][0]['Rows']));
                store.dispatch(setTotalPurchaseList(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setPurchaseList([]));
                store.dispatch(setTotalPurchaseList(0));
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

export const SuppliersListDropdownRequest=async()=>{
    try{
        const url=BaseUrl+"/SupplierDropDown";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'].length>0){
                store.dispatch(setSuppliersListDropdown(res.data['data']));
            }else {
                store.dispatch(setSuppliersListDropdown([]));
                toast.error('No Suppliers found');
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

export const CreatePurchaseRequest=async (Parent,Child)=>{
    try{
        store.dispatch(showLoader());
        const postBody={Parents:Parent,Child:Child};
        alert(JSON.stringify(postBody))
        let url=BaseUrl+"/createPurchase";
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if( res.data['status']==='success')
            {
                store.dispatch(resetPurchaseFormValue())
                toast.success("Purchase creation successfull");
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
