import {BaseUrl} from '../Helper/config.js'
import axios from "axios";
import toast from "react-hot-toast";
import {store} from "../Redux/store/store.js";
import {hideLoader, showLoader} from "../Redux/state-slice/spinner-slice.js";
import {getEmail, getOtp, getToken, setEmail, setOtp, setUserDetails} from "../Helper/sessionHelper.js";
import {SetProfile} from "../Redux/state-slice/profile-slice.js";

const axiosHeader={headers:{'token':getToken()}};
// const BaseUrl="https://inventory-management-backend-dun.vercel.app/api/v1"
export  async function RegistrationRequest(postBody){
   try{
       store.dispatch(showLoader());
       const URL=BaseUrl+'/registration';
       const res=await axios.post(URL,postBody);
       if(res.status===200){
           if(res.data['status']==="fail"){
               if (res.data['data'].includes('E11000') && res.data['data'].includes('email_1')) {
                   toast.error("Email Already Exists");
                   store.dispatch(hideLoader())
                   return false;
               }
               else{
                   toast.error("Something Went Wrong")
                   store.dispatch(hideLoader())
                   return false;
               }
           }
           else {
               toast.success("Registration Success")
               store.dispatch(hideLoader())
               return true;
           }
       }
       else{
           toast.error("Something Went Wrong")
           store.dispatch(hideLoader())
           return  false;
       }

   }catch (e) {
       toast.error("Something went wrong")
       store.dispatch(hideLoader())
       return false
   }
}

export  async function LoginRequest(postBody){
   try{
       store.dispatch(showLoader())
       const URL=BaseUrl+'/login';
       const res=await axios.post(URL,postBody);
       if(res.status===200){
           if(res.data['status']==='success'){
               toast.success("login successfull")
               store.dispatch(hideLoader())
               return res.data;

           }else {
               toast.error("Invalid user")
               store.dispatch(hideLoader())
           }
       }
       else {
           toast.error("Something went wrong")
           store.dispatch(hideLoader())
       }
   }catch (e) {
       toast.error("Something went wrong");
       store.dispatch(hideLoader())
   }
}

export  async function SentOtpRequest(email){
    try{
        store.dispatch(showLoader())
        const URL=BaseUrl+'/recoverVerifyEmail/'+email;
        const res=await axios.get(URL);
        if(res.status===200){
            if(res.data.status==='fail'){
                toast.error("User not found");
                store.dispatch(hideLoader());
                return false
            }else {
                toast.success("A 6 digit otp has sent to your email account");
                setOtp(res.data['otp'])
                await setEmail(email)
                store.dispatch(hideLoader())
                return true
            }

        }else {
            toast.error("Something went wrong");
            store.dispatch(hideLoader());
            return false;
        }
    }catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
        return false;
    }
}

export async function verifyOtpRequest(otp){
    try{
        store.dispatch(showLoader());
        const email=await getEmail()
        console.log("email",email)
        const url=BaseUrl+"/recoverVerifyOtp/"+email+"/"+otp;

        const res=await axios.get(url);
        if(res.status===200){
            if(res.data['status']==='success'){
                toast.success("OTP verification successful")
                store.dispatch(hideLoader());
                return true;
            }else {
                toast.error("Invalid OTP");
                store.dispatch(hideLoader());
                return false;
            }

        }else {
            toast.error("Something went wrong")
            store.dispatch(hideLoader());
            return false;
        }


    }catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader());
        return false;
    }
}

export async function createPasswordRequest(email,password){
    try{
        const url=BaseUrl+"/resetPassword";
        const postBody={
            email:email,
            otp:getOtp(),
            password:password
        }
        console.log(postBody)
        const res=await axios.post(url,postBody);

        if(res.status===200){
            if(res.data['status']==='fail'){
                toast.error("Email doesn't match");
                return false;
            }else {
                toast.success("New Password create successfull");
                store.dispatch(hideLoader());
                return true;
            }
        }
        else {
            toast.error("Something went wrong");
            store.dispatch(hideLoader());
            return false;
        }
    }catch (e) {
        toast.error("Something went wrong!");
        store.dispatch(hideLoader());
        return false;
    }
}

export async function getProfileDetailsRequest(){
    try{
        const url=BaseUrl+"/profileDetails";
        const res=await axios.get(url,axiosHeader);
        if(res.status===200){
            if(res.data['status']==='success'){
                store.dispatch(SetProfile(res.data['data'][0]));

            }
            else {
                toast.error("Something went wrong");
            }

        }else {
            toast.error("Something went wrong");
        }

    }catch (e) {
        toast.error('Something went wrong');
    }
}

export async function profileUpdateRequest(email,firstName,lastName,mobile,password,photo){
    try{
        store.dispatch(showLoader())
        const url=BaseUrl+"/profileUpdate";
        const postBody={
            firstName:firstName,
            lastName:lastName,
            mobile:mobile,
            password:password,
            photo:photo
        }

        await setUserDetails(postBody)
        const res=await axios.post(url,postBody,axiosHeader);
        if(res.status===200){
            if(res.data['status']==='success'){
                toast.success("Profile Update successfull");
                store.dispatch(hideLoader());
                return true;
            }
            else {
                toast.error("Something went wrong");
                store.dispatch(hideLoader());
                return false
            }
        }
        else {
            toast.error("Something went wrong");
            store.dispatch(hideLoader());
            return false
        }

    }catch (e) {
        toast.error("Something went wrong");
        store.dispatch(hideLoader())
      return false
    }

}

