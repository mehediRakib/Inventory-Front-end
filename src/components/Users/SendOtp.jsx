import React, {useRef} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {isEmail} from "../../Helper/FormHelper.js";
import toast from "react-hot-toast";
import {SentOtpRequest} from "../../APIRequest/UserAPIRequest.js";
import UserSubmitButton from "./UserSubmitButton.jsx";


const levelCss='text-md font-semibold mt-2'
const inputcss='border rounded-md px-3 py-1 border-pink-400  focus:outline-none focus:border-2 focus:border-pink-600 mt-1'

const SendOtp = () => {

    const navigate=useNavigate();
    let emailRef=useRef();

    const DoSentOtp=async () => {
        const email = emailRef.value;
        if (isEmail(email)) {
            toast.error("Require valid email")
        } else {
            const res = await SentOtpRequest(email)
            if(res){
                navigate('/verifyOTP')
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-1/4 h-auto shadow-lg bg-white border rounded-md p-8">
                <div className="">
                    <h2 className="text-3xl font-semibold font-sans">Email Verification</h2>
                </div>
                <div className="flex flex-col mt-4">
                    <label className={levelCss}>Email</label>
                    <input ref={(input)=>emailRef=input} className={inputcss} type="email" placeholder="User Email: " />
                </div>
                <div className="mt-4 w-full">
                    <UserSubmitButton onClick={DoSentOtp} text="Next" className={`${inputcss} w-full bg-pink-700 font-semibold hover:bg-pink-600 text-white`}/>
                </div>

            </div>
        </div>

    );
};

export default SendOtp;