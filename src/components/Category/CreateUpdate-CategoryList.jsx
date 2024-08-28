import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {isEmpty} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import SubmitButton from "../SubmitButton.jsx";
import {store} from "../../Redux/store/store.js";
import {resetFormValue, setFormValue} from "../../Redux/state-slice/category-slice.js";
import {CreateUpdateNewCategoryList, FillUpFormRequest} from "../../APIRequest/CategoryApiRequest.js";


const CreateUpdateCategoryList = () => {

    const navigate = useNavigate();
    let [objectId, setObjectId] = useState(0);

    let FormValue = useSelector((state)=>state.category.FormValue);
    useEffect(() => {
        const searchparam = new URLSearchParams(window.location.search);
        const id = searchparam.get('id');
        if (id !== null) {
            setObjectId(id);
            (async () => {
                await FillUpFormRequest(id)
            })();
        }
    }, []);

    const doChange = async () => {
        if (isEmpty(FormValue['name'])) {
            toast.error("Category name is required");
        } else {
            const res = await CreateUpdateNewCategoryList(FormValue, objectId);
            if (res) {
                toast.success("Category creation successful");
                store.dispatch(resetFormValue());
                navigate('/categoryList');
            }
        }
    };

    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center">
                    <div className="shadow-lg border w-3/5 h-auto rounded-md px-5 pt-10 pb-5 bg-white mt-10 flex justify-center items-center">
                        <div className="w-full">
                            <div className="flex justify-center items-center">
                                <h2 className="text-2xl font-semibold">Save Change</h2>
                            </div>
                            <div className="flex justify-center w-full pt-8">
                                <div className="space-y-1 w-3/5">
                                    <label className="font-semibold">Category Name</label>
                                    <input
                                        value={FormValue.name}
                                        onChange={(e) => { store.dispatch(setFormValue({ name: "name", value: e.target.value })) }}
                                        className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                        placeholder="Enter category name"
                                    />
                                </div>
                            </div>
                            <div className="mt-8 flex justify-center items-center">
                                <SubmitButton
                                    onClick={doChange}
                                    text="Save change"
                                    className="bg-green-700 opacity-80 py-2 rounded-md px-7 text-white font-semibold ring-1 ring-blue-800 hover:bg-green-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </MasterLayout>
    );
};
export default CreateUpdateCategoryList;