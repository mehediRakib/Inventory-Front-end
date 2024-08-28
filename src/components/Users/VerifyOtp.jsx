import React, {useRef, useState} from 'react';
import ReactCodeInput from "react-code-input";
import UserSubmitButton from "./UserSubmitButton.jsx";
import {verifyOtpRequest} from "../../APIRequest/UserAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";

const levelCss='text-md font-semibold mt-2'
const inputcss='border rounded-md px-3 py-1 border-pink-400  focus:outline-none focus:border-2 focus:border-pink-600 mt-1'


   const  defaultStyle={
       fontFamily: "monospace",
       MozAppearance: "textfield",
       margin: "4px",
       paddingLeft: "8px",
       width: "45px",
       borderRadius: '3px',
       height: "45px",
       fontSize: "32px",
       border: '2px solid lightskyblue',
       boxSizing: "border-box",
       color: "black",
       backgroundColor: "white",
       borderColor: "pink"
    }
const VerifyOtp = () => {
    const navigate=useNavigate()

    const [otp,setOtp]=useState();

    const OtpVerification=async () => {
        const res = await verifyOtpRequest(otp);
        if(res){
            navigate('/createPassword');
        }

    }
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-1/4 h-auto shadow-lg bg-white border rounded-md p-8">
                <div className="flex justify-center items-center">
                    <h2 className="text-3xl font-semibold font-sans">OTP Verification</h2>
                </div>
                <div className="flex flex-col mt-4 justify-center items-center">
                    <label className={levelCss}>A 6 digit Otp has been sent to your account</label>
                    <ReactCodeInput  onChange={(value)=>setOtp(value)} fields={6} inputStyle={defaultStyle} type="text" />

                </div>
                <div className="mt-4 w-full">
                    <UserSubmitButton onClick={OtpVerification}  text="Next" className={`${inputcss} text-white w-full bg-pink-700 font-semibold hover:bg-pink-600`} />
                </div>


            </div>
            <Toaster position="bottom-center"/>
        </div>
    );
};

export default VerifyOtp;