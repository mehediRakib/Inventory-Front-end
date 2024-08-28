import React, {useRef} from 'react';
import UserSubmitButton from "./UserSubmitButton.jsx";
import {is6digitPass, isEmail} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {FaWebAwesome} from "react-icons/fa6";
import {createPasswordRequest} from "../../APIRequest/UserAPIRequest.js";
import {useNavigate} from "react-router-dom";

const levelCss='text-md font-semibold mt-2'
const inputcss='border rounded-md px-3 py-1 border-pink-400  focus:outline-none focus:border-2 focus:border-pink-600 mt-1'

const CreatePassword = () => {

    let emailRef,newPassRef,conPassRef=useRef();
    const navigate=useNavigate();

    const createNewPassword=async () => {
        const email = emailRef.value;
        const newPass = newPassRef.value;
        const conPass = conPassRef.value;
        if (isEmail(email)) {
            toast.error('Require valid email');
        } else if (is6digitPass(newPass)) {
            toast.error("Please, Enter 6 digit password")
        } else if (newPass !== conPass) {
            toast.error("Confirm password doesn't match");
        } else {
            const res = await createPasswordRequest(email,newPass);
            if(res){
                navigate('/login')
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-1/4 h-auto shadow-lg bg-white border rounded-md p-8">
                <div className="flex justify-center items-center">
                    <h2 className="text-3xl font-semibold font-sans">Set New Password</h2>
                </div>
                <div className="flex flex-col mt-4">
                    <label className={levelCss}>Email</label>
                    <input ref={(input)=>emailRef=input} className={inputcss} type="email" placeholder="User Email: " />

                    <label className={levelCss}>New Password</label>
                    <input  ref={(input)=>newPassRef=input} className={inputcss} type="password" placeholder="New Password" />

                    <label className={levelCss}>Confirm Password</label>
                    <input  ref={(input)=>conPassRef=input} className={inputcss} type="password" placeholder="Confirm Password " />
                </div>
                <div className="mt-4 w-full">
                    <UserSubmitButton onClick={createNewPassword} text="Next" className={`${inputcss} text-white w-full bg-pink-700 font-semibold hover:bg-pink-600`} />
                </div>
            </div>
            <Toaster position="bottom-center"/>
        </div>
    );
};

export default CreatePassword;