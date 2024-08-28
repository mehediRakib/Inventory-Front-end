import React, {useEffect, useRef} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {FaShoppingCart} from "react-icons/fa";
import {AiTwotoneDelete} from "react-icons/ai";
import {
    CreateSaleRequest,
    CustomerListDropdownRequest,
    ProductListDropdownRequest
} from "../../APIRequest/SalesAPIRequest.js";
import {useSelector} from "react-redux";
import {store} from "../../Redux/store/store.js";
import {removeSaleItemList, setSaleFormValue, setSaleItemList} from "../../Redux/state-slice/sales-slice.js";
import {isEmpty} from "../../Helper/FormHelper.js";
import toast, {Toaster} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import SubmitButton from "../SubmitButton.jsx";

const SalesCreateUpdate = () => {

    const CustomerListDropdown = useSelector((state) => state.sale.CustomerListDropdown)
    const ProductListDropdown = useSelector((state) => state.sale.ProductListDropdown);
    const SaleFormValue = useSelector((state) => state.sale.SaleFormValue);
    const SaleItemList = useSelector((state) => state.sale.SaleItemList)

    const navigate = useNavigate();

    let productRef, QtyRef, priceRef = useRef();

    useEffect(() => {
        (async () => {
            await CustomerListDropdownRequest()
            await ProductListDropdownRequest()
        })()
    }, []);

    const AddProductToCart = async () => {
        const Qty = QtyRef.value;
        const price = priceRef.value;
        const productId = productRef.value;

        if (isEmpty(productId)) {
            toast.error("Please,Select a product")
        } else if (isEmpty(Qty)) {
            toast.error("Quantity is required");
        } else if (isEmpty(price)) {
            toast.error("Price is required");
        } else {
            let itemList = {
                productID: productId,
                productName: productRef.selectedOptions[0].text,
                qty: parseInt(Qty),
                unitCost: parseInt(price),
                Total: parseInt(Qty * price)
            }
            store.dispatch(setSaleItemList(itemList));
            CalculateGrandTotal();
        }
    }

    const CreateSale = async () => {
        if (isEmpty(SaleFormValue.customerID)) {
            toast.error("Please,Select a Customer");
        } else if (isEmpty(SaleFormValue.VatTax)) {
            toast.error("Vat/Tax is required")
        } else if (isEmpty(SaleFormValue.discount)) {
            toast.error("Discount is required")
        } else if (isEmpty(SaleFormValue.grandTotal)) {
            toast.error("Grand Total is required")
        } else {
            const res = await CreateSaleRequest(SaleFormValue, SaleItemList);
            if (res) {
                navigate('/SalesList')
            }
        }
    }

    useEffect(() => {
        (()=>{
            CalculateGrandTotal();
        })()
    }, [SaleItemList,SaleFormValue]);
    const CalculateGrandTotal = () => {
        let total = 0;
        SaleItemList.forEach((item, i) => {
            total = total + item['Total'];
        })
        const grandTotal = total - (SaleFormValue.VatTax || 0) - (SaleFormValue.discount || 0) - (SaleFormValue.shippingCost || 0) - (SaleFormValue.otherCost || 0);
        store.dispatch(setSaleFormValue({name: 'grandTotal', value: grandTotal}));
    }
    const doRemoveSaleItem = async (i) => {
        const total=SaleFormValue.grandTotal-SaleItemList['Total']
        store.dispatch(removeSaleItemList(i));
        store.dispatch(setSaleFormValue({name: "grandTotal", value: total}))
    }
    return (
        <MasterLayout>
            <div className="container mb-5">
                <div className="flex space-x-5 ">
                    <div className="shadow-xl w-2/5 h-auto border rounded-md bg-white">
                        <div>
                            <div className=" px-5 pt-8">
                                <h2 className="text-xl font-semibold mb-2">Create Sales</h2>
                                <hr/>
                                <div className="pt-8">
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Customer Name</label>
                                        <select
                                            className="rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            onChange={(e) => store.dispatch(setSaleFormValue({
                                                name: "customerID",
                                                value: e.target.value
                                            }))}>
                                            <option>Select Customer</option>
                                            {
                                                CustomerListDropdown.map((item, index) => (
                                                    <option value={item['_id']} key={index} className="text-gray-700">
                                                        {item['customerName']}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Vat/Tax</label>
                                        <input
                                            className="rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Vat/Tax"
                                            onChange={(e) => {
                                                store.dispatch(setSaleFormValue({name: "VatTax", value: e.target.value}));
                                            }}
                                            type="number"
                                        />

                                    </div>
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Discount</label>
                                        <input
                                            className=" rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Discount"
                                            onChange={(e) => store.dispatch(setSaleFormValue({
                                                name: "discount",
                                                value: e.target.value
                                            }))}
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Shipping Cost</label>
                                        <input
                                            className=" rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Shipping Cost"
                                            onChange={(e) => store.dispatch(setSaleFormValue({
                                                name: "shippingCost",
                                                value: e.target.value
                                            }))}
                                            type="number"
                                        />
                                    </div>

                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Other cost</label>
                                        <input
                                            className=" rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Other cost"
                                            onChange={(e) => store.dispatch(setSaleFormValue({
                                                name: "otherCost",
                                                value: e.target.value
                                            }))}
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Grand Total</label>
                                        <input
                                            className=" rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Grand Total"
                                            value={SaleFormValue.grandTotal}
                                            type="number"
                                        />
                                    </div>
                                    <div className="flex flex-col my-4 space-y-1">
                                        <label className="font-semibold">Note</label>
                                        <input
                                            className=" rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            placeholder="Note"
                                            onChange={(e) => store.dispatch(setSaleFormValue({
                                                name: "note",
                                                value: e.target.value
                                            }))}
                                            type="text"
                                        />
                                    </div>
                                    <div className="flex justify-center items-center my-2">
                                        <SubmitButton
                                            onClick={CreateSale}
                                            text="Create"
                                            className="w-full ring-1 ring-orange-500 py-2 rounded-md bg-green-800 text-white focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold hover:bg-green-700 transition duration-150 ease-in-out"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shadow-xl w-3/5 h-auto border rounded-md bg-white">
                        <div className=" px-5 pt-10">
                            <div className="flex space-x-3">
                                <div className="flex flex-col w-1/2 space-y-1">
                                    <label className="font-semibold">Select Product</label>
                                    <select
                                        ref={(input) => productRef = input}
                                        className=" rounded-md py-1 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150">
                                        <option value="">Select Product</option>
                                        {
                                            ProductListDropdown.map((item, index) => (
                                                <option value={item['_id']} key={index} className="text-gray-700">
                                                    {item['name']}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="flex w-1/2 space-x-2">
                                    <div className="flex flex-col w-1/3 space-y-1">
                                        <label className="font-semibold">Qty</label>
                                        <input
                                            className=" rounded-md py-1 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            type="number"
                                            ref={(input) => QtyRef = input}
                                            placeholder="Quantity"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/3 space-y-1">
                                        <label className="font-semibold">Unit Price</label>
                                        <input
                                            className=" rounded-md py-1 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                            type="number"
                                            ref={(input) => priceRef = input}
                                            placeholder="Unit price"
                                        />
                                    </div>
                                    <div className="flex flex-col w-1/3 space-y-1">
                                        <label className="font-semibold">Add to cart</label>
                                        <button
                                            onClick={AddProductToCart}
                                            className=" flex items-center justify-center ring-1 ring-orange-300 rounded-md py-1.5 px-3 bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-800 hover:bg-green-500 transition duration-150">
                                            <FaShoppingCart className="text-white w-5 h-5"/>
                                        </button>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-2 py-5">
                                <div>
                                    <table className=" min-w-full table-auto">
                                        <thead className="bg-gray-200 rounded-sm">
                                        <tr className="">
                                            <th className="px-4 py-2 text-left">Name</th>
                                            <th className="px-4 py-2 text-left">Qty</th>
                                            <th className="px-4 py-2 text-left">Unit Price</th>
                                            <th className="px-4 py-2 text-left">Total</th>
                                            <th className="px-4 py-2 text-left">Remove</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            SaleItemList.map((item, index) => (
                                                <tr>
                                                    <td className="px-4 py-2">{item['productName']}</td>
                                                    <td className="px-4 py-2">{item['qty']}</td>
                                                    <td className="px-4 py-2">{item['unitCost']}</td>
                                                    <td className="px-4 py-2">{item['Total']}</td>
                                                    <td className="px-4 py-2"><AiTwotoneDelete
                                                        onClick={doRemoveSaleItem.bind(this, index)}
                                                        className="hover:transtion hover:translate-y-1 hover:scale-110 hover:text-red-700 hover:duration-300 text-red-600 "
                                                        size={20}/></td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <Toaster position="bottom-center"/>
        </MasterLayout>
    );
};

export default SalesCreateUpdate;