import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {useSelector} from "react-redux";
import {store} from "../../Redux/store/store.js";
import {FillUpFormRequest} from "../../APIRequest/CustomerAPIRequest.js";
import {useNavigate} from "react-router-dom";
import {isEmpty} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import SubmitButton from "../SubmitButton.jsx";
import {
    BrandListDropDown,
    CategoryListDropDown,
    CreateUpdateProductListRequest, FillupFormProductListRequest
} from "../../APIRequest/ProductAPIRequest.js";
import {resetFormValue, setFormValue} from "../../Redux/state-slice/product-slice.js";

const CreateUpdateProductList = () => {
    const navigate = useNavigate();
    let [objectId,setObjectId]=useState(0)

    let FormValue = useSelector((state) => state.product.FormValue);
    let BrandDropDown=useSelector((state)=>state.product.BrandListDropDown);
    let CategoryDropDown=useSelector((state)=>state.product.CategoryListDropDown);

    useEffect(() => {
        const searchparam= new URLSearchParams(window.location.search);
        const id=searchparam.get('id');
        // store.dispatch(resetFormValue())
        if(id!==null){
            setObjectId(id);
            (async () => {
                await FillupFormProductListRequest(id)
            })()
        }
        (async () => {
            await BrandListDropDown();
            await CategoryListDropDown();
        })()
    }, []);

    const doChange = async () => {
        if (isEmpty(FormValue.name)) {
            toast.error("Product name required")
        } else if (isEmpty(FormValue.brandID)) {
            toast.error("Brand is required");
        } else if (isEmpty(FormValue.categoryID)) {
            toast.error("Category is required")
        } else if (isEmpty(FormValue.unit)) {
            toast.error('Unit is required')
        } else if (isEmpty(FormValue.price)) {
            toast.error('Price is required')
        }else {
            const res = await CreateUpdateProductListRequest(FormValue,objectId);
            if (res) {
                store.dispatch(resetFormValue())
                navigate('/ProductList')
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
                                    <label className="font-semibold">Product Name</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'name', value: e.target.value}))
                                    }} value={FormValue['name']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Product Name"/>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Product Brand</label>
                                    <div className="w-full">
                                        <select
                                            onChange={(e)=>store.dispatch(setFormValue({name:"brandID",value:e.target.value}))}
                                            value={FormValue.brandID}
                                            className="w-full py-2 rounded-md border border-gray-300 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-green-50">
                                            <option className="text-gray-500">Select Brand</option>
                                            {
                                                BrandDropDown.map((item, index) => (
                                                    <option key={index} value={item['_id']} className="text-gray-700">{item['name']}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Product category</label>
                                    <div className="w-full">
                                        <select
                                            onChange={(e)=>store.dispatch(setFormValue({name:"categoryID",value:e.target.value}))}
                                            value={FormValue.categoryID}
                                            className="w-full py-2 rounded-md border border-gray-300 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-green-50">
                                            <option className="text-gray-500">Select Category</option>
                                            {
                                                CategoryDropDown.map((item, index) => (
                                                    <option value={item['_id']} key={index} className="text-gray-700">{item['name']}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Unit</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'unit', value: e.target.value}))
                                    }} value={FormValue['unit']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Unit"/>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Price</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'price', value: e.target.value}))
                                    }} value={FormValue['price']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Price"/>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="space-y-1">
                                    <label className="font-semibold">Details</label>
                                    <textarea onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'details', value: e.target.value}))
                                    }} value={FormValue['details']}
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
export default CreateUpdateProductList;