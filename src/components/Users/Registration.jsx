import React, { useRef } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {is6digitPass, isEmail, isEmpty, isNumber} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {RegistrationRequest} from "../../APIRequest/UserAPIRequest.js";
import UserSubmitButton from "./UserSubmitButton.jsx";

const levelCss = 'text-md font-semibold mt-2';
const inputcss = 'border rounded-md px-3 py-1 border-pink-400 focus:outline-none focus:border-2 focus:border-pink-600 mt-1';

const Registration = () => {
    const firstNameRef = useRef();
    const LastNameRef = useRef();
    const EmailRef = useRef();
    const MobileRef = useRef();
    const PasswordRef = useRef();

    const navigate=useNavigate()
    const DoRegistration = async () => {
        let FirstName = firstNameRef.current.value;
        let LastName = LastNameRef.current.value;
        let Email = EmailRef.current.value;
        let Mobile = MobileRef.current.value;
        let Password = PasswordRef.current.value;
        const postBody = {
            email: Email,
            firstName: FirstName,
            lastName: LastName,
            mobile: Mobile,
            password: Password,
            photo: ""
        }
        if (isEmpty(FirstName)) {
            toast.error("First name is required")
        } else if (isEmpty(LastName)) {
            toast.error("Last name is required")
        } else if (isEmail(Email)) {
            toast.error(" Valid email is require")
        } else if (isNumber(Mobile)) {
            toast.error("Valid Phone Number is required")
        } else if (is6digitPass(Password)) {
            toast.error("6 digit password is required")
        } else {
            const res = await RegistrationRequest(postBody)
            if(res){
                navigate('/login');
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="w-1/3 h-auto shadow-lg bg-white border rounded-md p-8">
                <div className="flex justify-center items-center">
                    <h2 className="text-3xl font-semibold font-sans">Registration</h2>
                </div>
                <div className="flex flex-col mt-4">
                    <label className={levelCss}>First Name</label>
                    <input ref={firstNameRef} className={inputcss} type="text" placeholder="First Name: " />

                    <label className={levelCss}>Last Name</label>
                    <input ref={LastNameRef} className={inputcss} type="text" placeholder="Last Name: " />

                    <label className={levelCss}>Email</label>
                    <input ref={EmailRef} className={inputcss} type="email" placeholder="Email:" />

                    <label className={levelCss}>Mobile</label>
                    <input ref={MobileRef} className={inputcss} type="number" placeholder="Mobile: " />

                    <label className={levelCss}>Password</label>
                    <input ref={PasswordRef} className={inputcss} type="password" placeholder="Password: " />
                </div>
                <div className="mt-4 w-full">
                    <UserSubmitButton  onClick={DoRegistration} text="Next" className={`${inputcss} text-white w-full bg-pink-700 font-semibold hover:bg-pink-600`} />
                </div>

                <div className="flex justify-center items-center mt-3 text-pink-600 text-lg">
                    <div className="flex flex-col items-center space-y-3">
                        <Link to='/login' className="hover:text-pink-800" >Sign In</Link>
                    </div>
                </div>

            </div>
            <Toaster position="bottom-center"/>
        </div>
    );
};

export default Registration;
