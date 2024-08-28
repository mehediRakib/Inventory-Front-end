import React, {useEffect, useRef, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {getProfileDetailsRequest, profileUpdateRequest} from "../../APIRequest/UserAPIRequest.js";
import {useSelector} from "react-redux";
import toast, {Toaster} from "react-hot-toast";
import UserSubmitButton from "./UserSubmitButton.jsx";
import {getBase64, is6digitPass, isEmail, isEmpty, isNumber} from "../../Helper/FormHelper.js";
import {useNavigate} from "react-router-dom";
import {AiOutlineUser} from "react-icons/ai";

const Profile = () => {
    const navigate=useNavigate();

    let emailRef,firstNameRef,lastNameRef,mobileRef,passRef=useRef();
    let [image,setImage]=useState("");


    useEffect(() => {
        (async () => {
            await getProfileDetailsRequest();
        })()
    }, [])

    const profileData=useSelector((state)=>state.profile.value);



   const DoUpdate=async ()=>{
        let email=emailRef.value
        let firstName=firstNameRef.value
        let lastName=lastNameRef.value
        let mobile=mobileRef.value
        let password=passRef.value
       let photo = image ? await getBase64(image) : profileData['photo'] ;

        if(isEmail(email)){
            toast.error("Require Valid Email Address");
        }
        else if(isEmpty(firstName)){
            toast.error("First Name is require");
        }
        else if(isEmpty(lastName)){
            toast.error("Last Name is require");
        }
        else if(isNumber(mobile)){
            toast.error("Valid phone number is require");
        }
        else if(is6digitPass(password)){
            toast.error("6 digit password is required");
        }
        else {
            const res=await profileUpdateRequest(email,firstName,lastName,mobile,password,photo);
            if(res){
                navigate('/');
            }
        }




    }


    let inputBoxCss = "py-2 border rounded-md border-pink-300 px-4 focus:outline-none focus:border-pink-500 focus:border-2";
    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center mt-16">
                    <div className=" w-full sm:w-4/5 md:w-3/4 lg:w-2/3 h-auto shadow-md bg-white rounded-md border">
                        <div>
                            <div className="mt-12 mb-5 relative ml-16 lg:w-20 lg:h-20 sm:w-16 sm:h-16 w-10 h-10 ">
                                {image ? (
                                    <div className="w-full h-full rounded-full shadow-lg overflow-hidden ring-2 ring-green-700">
                                        <img src={URL.createObjectURL(image)}  alt="Selected Pic" className="w-full h-full object-cover" />
                                    </div>
                                ) : profileData['photo'] ? (
                                    <div className="w-full h-full rounded-full shadow-lg overflow-hidden ring-2 ring-green-700">
                                        <img src={profileData['photo']} alt="Profile Pic" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <div className="w-full h-full rounded-full shadow-lg overflow-hidden ring-2 ring-green-700 flex items-center justify-center">
                                        <AiOutlineUser className="w-14 h-14 text-gray-700" />
                                    </div>
                                )}
                            </div>
                            <hr/>
                            <div className="grid gap-4 px-8 mt-8 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                <div className="flex flex-col space-y-1 cursor-pointer">
                                    <label className="font-semibold text-gray-600">Profile Picture</label>
                                    <div className="relative w-full">
                                        <input type="file" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} className={`absolute inset-0 w-full h-full cursor-pointer  ${image===""?'opacity-0':'' }`} />
                                        <button
                                            className={`${inputBoxCss} bg-pink-200 text-gray-700 hover:bg-pink-600 transition duration-200 w-full ring-1 ring-emerald-500 cursor-pointer flex items-center py-2`}>
                                            Choose File
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-semibold text-gray-600">Email</label>
                                    <input type="text" ref={(input)=>emailRef=input} className={inputBoxCss} placeholder="Email Address" defaultValue={profileData['email']} readOnly={true}/>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-semibold text-gray-600">First Name</label>
                                    <input type="text" ref={(input)=>firstNameRef=input} className={inputBoxCss} placeholder="First Name" defaultValue={profileData['firstName']} />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-semibold text-gray-600">Last Name</label>
                                    <input type="text" ref={(input)=>lastNameRef=input} className={inputBoxCss} placeholder="Last Name" defaultValue={profileData['lastName']}/>
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-semibold text-gray-600">Mobile</label>
                                    <input type="text" ref={(input)=>mobileRef=input} className={inputBoxCss} placeholder="Mobile" defaultValue={profileData['mobile']} />
                                </div>
                                <div className="flex flex-col space-y-1">
                                    <label className="font-semibold text-gray-600">Password</label>
                                    <input type="password" ref={(input)=>passRef=input} className={inputBoxCss} placeholder="Password" defaultValue={profileData['password']}/>
                                </div>

                                <div className="flex flex-col space-y-1 mt-4">
                                    <UserSubmitButton  onClick={DoUpdate} className={`${inputBoxCss} bg-pink-600 text-white font-semibold ring-1 ring-purple-400 hover:bg-pink-700`} text="UPdate" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster position="bottom-center"/>
            </div>
        </MasterLayout>
    );
};

export default Profile;
