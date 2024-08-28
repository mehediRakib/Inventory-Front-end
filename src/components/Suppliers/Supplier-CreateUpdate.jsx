import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {useSelector} from "react-redux";
import {store} from "../../Redux/store/store.js";
import {useNavigate} from "react-router-dom";
import {isEmail, isEmpty, isNumber} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import SubmitButton from "../SubmitButton.jsx";
import {CreateNewSupplier, FillUpFormRequest} from "../../APIRequest/SuppliersAPIRequest.js";
import {resetFormValue, setFormValue} from "../../Redux/state-slice/suppliers-slice.js";


const SupplierCreateUpdate = () => {
    const navigate = useNavigate();
    let [objectId,setObjectId]=useState(0)

    let FormValue = useSelector((state) => state.supplier.FormValue);

    useEffect(() => {
        const searchparam= new URLSearchParams(window.location.search);
        const id=searchparam.get('id');
        store.dispatch(resetFormValue())
        if(id!==null){
            setObjectId(id);
            (async () => {
                await FillUpFormRequest(id)
            })()
        }
    }, []);

    const doChange = async () => {
        if (isEmpty(FormValue.supplierName)) {
            toast.error("Supplier name required")
        } else if (isEmail(FormValue.email)) {
            toast.error("Required valid email");
        } else if (isNumber(FormValue.phone)) {
            toast.error("Required 11 digit contact number")
        } else if (isEmpty(FormValue.address)) {
            toast.error('Address is require')
        } else {
            const res = await CreateNewSupplier(FormValue,objectId);
            if (res) {
                navigate('/supplierList')
            }
        }

    }
    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <div className="shadow-lg border w-full h-auto rounded-md px-5 pt-10 pb-5 bg-white mt-10">
                        <div className="">
                            <div>
                                <h2 className="text-2xl font-semibold">Save Change</h2>
                            </div>
                            <div className="grid grid-cols-3 gap-4 w-full pt-8">
                                <div className="space-y-1">
                                    <label className="font-semibold">Supplier Name</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'supplierName', value: e.target.value}))
                                    }} value={FormValue['supplierName']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Supplier Name"/>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Email</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'email', value: e.target.value}))
                                    }} value={FormValue['email']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Email"/>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Phone</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'phone', value: e.target.value}))
                                    }} value={FormValue['phone']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Phone"/>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="space-y-1">
                                    <label className="font-semibold">Address</label>
                                    <textarea onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'address', value: e.target.value}))
                                    }} value={FormValue['address']}
                                              className="w-full py-5 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70 focus:border-gree-600"/>
                                </div>
                            </div>
                            <div className="mt-8">
                                <SubmitButton onClick={doChange}
                                              text="Save change"
                                              className="bg-green-700 opacity-80 py-2 rounded-md px-7 text-white font-semibold ring-1 ring-blue-800 hover:bg-green-600" />
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <Toaster position="bottom-center"/>
        </MasterLayout>
    );
};
export default SupplierCreateUpdate;