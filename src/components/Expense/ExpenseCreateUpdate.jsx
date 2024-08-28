import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {useSelector} from "react-redux";
import {store} from "../../Redux/store/store.js";
import {useNavigate} from "react-router-dom";
import {isEmpty} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import SubmitButton from "../SubmitButton.jsx";
import {
    CreateUpdateExpenseListRequest,
    ExpenseTypeListDropDown,
    FillupFormExpenseRequest
} from "../../APIRequest/ExpensesAPIRequest.js";
import {resetFormValue, setFormValue} from "../../Redux/state-slice/expense-slice.js";


const ExpenseCreateUpdate = () => {
    const navigate = useNavigate();
    let [objectId,setObjectId]=useState(0)

    let FormValue = useSelector((state) => state.expense.FormValue);
    let BrandDropDown=useSelector((state)=>state.product.BrandListDropDown);
    let ExpenseTypelistDropdown=useSelector((state)=>state.expense.ExpenseTypelistDropdown);

    useEffect(() => {
        const searchparam= new URLSearchParams(window.location.search);
        const id=searchparam.get('id');
        if(id!==null){
            store.dispatch(resetFormValue())
            setObjectId(id);
            (async () => {
                await FillupFormExpenseRequest(id)
            })()
        }
        (async () => {
            await ExpenseTypeListDropDown();
        })()
    }, []);

    const doChange = async () => {
        if (isEmpty(FormValue['expenseTypeID'])) {
            toast.error("Expense Type is required")
        } else if (FormValue.Amount===0) {
            toast.error("Amount is required");
        } else {
            const res = await CreateUpdateExpenseListRequest(FormValue,objectId);
            if (res) {
                store.dispatch(resetFormValue())
                navigate('/ExpenseList')
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
                                    <label className="font-semibold">Expense Types</label>
                                    <div className="w-full">
                                        <select
                                            onChange={(e)=>store.dispatch(setFormValue({name:"expenseTypeID",value:e.target.value}))}
                                            value={FormValue.expenseTypeID}
                                            className="w-full py-2 rounded-md border border-gray-300 px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-800 focus:border-green-600 shadow-sm transition-all duration-300 ease-in-out hover:bg-green-50">
                                            <option className="text-gray-500">Select Expense Type</option>
                                            {
                                                ExpenseTypelistDropdown.map((item, index) => (
                                                    <option key={index} value={item['_id']} className="text-gray-700">{item['name']}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                </div>

                                <div className="space-y-1">
                                    <label className="font-semibold">Expense Amount</label>
                                    <input onChange={(e) => {store.dispatch(setFormValue({name: 'Amount', value:parseInt(e.target.value)}))}}
                                           type="number"
                                           value={FormValue['Amount']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Amount"/>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-semibold">Expense Note</label>
                                    <input onChange={(e) => {
                                        store.dispatch(setFormValue({name: 'Note', value: e.target.value}))
                                    }} value={FormValue['Note']}
                                           className="w-full py-2 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-1 focus:ring-green-800 focus:opacity-70"
                                           placeholder="Note"/>
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
export default ExpenseCreateUpdate;