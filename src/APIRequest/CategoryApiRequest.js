import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {setCategoryList, setCategoryListTotal} from "../Redux/state-slice/category-slice.js";
import {getToken} from "../Helper/sessionHelper.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
import {setFormValue} from "../Redux/state-slice/brand-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const CategoryListRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/categoryList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setCategoryList(res.data['data'][0]['Rows']));
                store.dispatch(setCategoryListTotal(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setCategoryList([]));
                store.dispatch(setCategoryListTotal(0));
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

export const CreateUpdateNewCategoryList=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createCategory";
        if(objectId!==0){
            url=BaseUrl+"/categoryUpdate/"+objectId;
        }
        let res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200)
        {
            if(res.data['status']==='success'){
                // store.dispatch(resetFormValue())
                toast.success("Category creation successfull");
                store.dispatch(hideLoader());
                return true;
            }
            else if (res.data['status']==='fail' && res.data['data'].includes('duplicate key error')) {
                toast.error("This category name already exists. Please choose a different name.");
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
        const url=BaseUrl+"/categoryDetailsById/"+objectId;
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

export const DeleteCategoryRequest=async (objectId)=>{
    try{
        store.dispatch(showLoader());
        const url=BaseUrl+"/DeleteCategory/"+objectId;
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



