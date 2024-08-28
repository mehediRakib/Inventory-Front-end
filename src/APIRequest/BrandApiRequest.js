
import {BaseUrl} from '../Helper/config.js'
import axios from "axios";
import {getToken} from "../Helper/sessionHelper.js";
import toast from "react-hot-toast";
import {setBrandList, setBrandListTotal, setFormValue} from "../Redux/state-slice/brand-slice.js";
import {store} from "../Redux/store/store.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const brandListRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{
        const url=BaseUrl+"/brandList/"+pageNumber+"/"+perPage+"/"+searchKeyword;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setBrandList(res.data['data'][0]['Rows']));
                store.dispatch(setBrandListTotal(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setBrandList([]));
                store.dispatch(setBrandListTotal(0));
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

export const CreateUpdateNewBrand=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createBrand";
        if(objectId!==0){
            url=BaseUrl+"/brandUpdate/"+objectId;
        }
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200)
        {
            if(res.data['status']==='success'){
                // store.dispatch(resetFormValue())
                toast.success("Brand creation successfull");
                store.dispatch(hideLoader());
                return true;
            }
            else if (res.data['status']==='fail' && res.data['data'].includes('duplicate key error')) {
                toast.error("This brand name already exists. Please choose a different name.");
                store.dispatch(hideLoader());
            } else {
                toast.error("An error occurred. Please try again.");
                store.dispatch(hideLoader())
            }

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
        const url=BaseUrl+"/brandDetailsById/"+objectId;
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

export const DeleteBrandRequest=async (objectId)=>{
    try{
        store.dispatch(showLoader());
        const url=BaseUrl+"/DeleteBrand/"+objectId;
        const res=await axios.get(url,axiosHeader)
        if(res.status===200) {
            if (res.data['status'] === 'success')
                {
                    toast.success("Delete successful");
                    store.dispatch(hideLoader());
                    return true;
                }
            else if(res.data['status']==='associate'){
                toast.error(res.data['data']);
                store.dispatch(hideLoader());
                return false;
            }
            else {
                toast.error("Something went wrong");
                store.dispatch(hideLoader());
                return false;
            }
        }
    }catch (e) {
         toast.error("Something went wrong")
        store.dispatch(hideLoader());
        return false;
    }
}

