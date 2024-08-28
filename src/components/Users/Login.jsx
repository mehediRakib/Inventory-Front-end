import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {isEmail, isEmpty} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {LoginRequest} from "../../APIRequest/UserAPIRequest.js";
import { setToken, setUserDetails} from "../../Helper/sessionHelper.js";
import UserSubmitButton from "./UserSubmitButton.jsx";

const levelCss='text-md font-semibold mt-2'
const inputcss='border rounded-md px-3 py-1 border-pink-400  focus:outline-none focus:border-2 focus:border-pink-600 mt-1'
const Login = () => {


    let emailRef,passRef=useRef();
    const DoLoging=async () => {
        let email = emailRef.value;
        let pass = passRef.value;
        const postBody = {
            email: email,
            password: pass
        }
        if (isEmail(email)) {
            toast.error("valid email required");
        } else if (isEmpty(pass)) {
            toast.error("Password is required")
        } else {
            const res = await LoginRequest(postBody)
            await setToken(res['token']);
            await  setUserDetails(res['data']);
            window.location.href='/'

        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-1/4 h-auto shadow-lg bg-white border rounded-md p-8">
                <div className="flex justify-center items-center">
                    <h2 className="text-3xl font-semibold font-sans">Login</h2>
                </div>
                <div className="flex flex-col mt-4">
                    <label className={levelCss}>Email</label>
                    <input ref={(input)=>emailRef=input} className={inputcss} type="email" placeholder="User Email: " />

                    <label className={levelCss}>Password</label>
                    <input ref={(input)=>passRef=input} className={inputcss} type="password" placeholder="User Password " />
                </div>
                <div className="mt-4 w-full">
                    <UserSubmitButton onClick={DoLoging} className={inputcss} text="Log In"/>
                </div>

                <div className="flex justify-center items-center mt-3 text-pink-600 text-lg">
                    <div className="flex flex-col items-center space-y-3">
                        <Link to="/Registration" className="hover:text-pink-800">Sign Up</Link>
                        <Link to="/ForgetPassword" className="hover:text-pink-800">Forget Password</Link>
                    </div>
                </div>

            </div>
            <Toaster position="bottom-center"/>
        </div>

    );
};

export default Login;