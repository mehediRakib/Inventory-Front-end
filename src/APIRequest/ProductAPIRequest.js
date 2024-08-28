import {BaseUrl} from "../Helper/config.js";
import axios from "axios";
import {store} from "../Redux/store/store.js";
import toast from "react-hot-toast";
import {getToken} from "../Helper/sessionHelper.js";
import {
    setBrandListDropDown,
    setCategoryListDropDown, setFormValue,
    setProductList,
    setTotalProductList
} from "../Redux/state-slice/product-slice.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
const axiosHeader={headers:{'token':getToken()}};

export const ProductApiRequest=async (pageNumber,perPage,searchKeyword)=>{
    try{

        const url=BaseUrl+"/ProductList/"+pageNumber+"/"+perPage+"/"+searchKeyword;

        const res=await axios.get(url,axiosHeader);

        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'][0]['Rows'].length>0){
                store.dispatch(setProductList(res.data['data'][0]['Rows']));
                store.dispatch(setTotalProductList(res.data['data'][0]['Total'][0]['count']));
            }
            else{
                store.dispatch(setProductList([]));
                store.dispatch(setTotalProductList(0));
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

export const BrandListDropDown=async ()=>{
   try{
       const url=BaseUrl+"/brandDropDown";
       const res=await axios.get(url,axiosHeader);
       if(res.status===200 && res.data['status']==='success'){
           if(res.data['data'].length>0){
               store.dispatch(setBrandListDropDown(res.data['data']));
           }
           else {
               store.dispatch(setBrandListDropDown([]))
               toast.error("No brand found")
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

export const CategoryListDropDown=async ()=>{
    try{
        const url=BaseUrl+"/categoryDropDown";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            if(res.data['data'].length>0){
                store.dispatch(setCategoryListDropDown(res.data['data']));
            }
            else {
                store.dispatch(setCategoryListDropDown([]))
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

export const CreateUpdateProductListRequest=async (postBody,objectId)=>{
    try{
        store.dispatch(showLoader());
        let url=BaseUrl+"/createProduct";
        if(objectId!==0){
            url=BaseUrl+"/UpdateProduct/"+objectId;
        }
        const res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if(res.data['status']==='success'){
                toast.success("Product creation successfull");
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

export const FillupFormProductListRequest=async (objectId)=>{
    try{
        const url=BaseUrl+"/productDetailsById/"+objectId;
        const res=await axios.get(url,axiosHeader);
        if(res.status===200 && res.data['status']==='success'){
            store.dispatch(setFormValue({name:'name',value:res.data['data'][0]['name']}))
            store.dispatch(setFormValue({name:'price',value:res.data['data'][0]['price']}))
            store.dispatch(setFormValue({name:'unit',value:res.data['data'][0]['unit']}))
            store.dispatch(setFormValue({name:'details',value:res.data['data'][0]['details']}))
            store.dispatch(setFormValue({name:'brandID',value:res.data['data'][0]['brandID']}))
            store.dispatch(setFormValue({name:'categoryID',value:res.data['data'][0]['categoryID']}))
        }
        else {
            toast.error("Request Fail! Please try again")

        }


    }catch (e) {
        toast.error("Something went wrong");
        return false;

    }
}

export const DeleteProductRequest=async (objectId)=>{
    try{
        const url=BaseUrl+'/DeleteProduct/'+objectId;
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