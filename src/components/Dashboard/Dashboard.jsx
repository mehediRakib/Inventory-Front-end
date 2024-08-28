import React, {useEffect} from 'react';
import MasterLayout from '../MasterLayout/MasterLayout';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useSelector} from "react-redux";
import currencyFormatter from 'currency-formatter';
import {ExpensesSummary, PurchaseSummary, ReturnSummary, SalesSummary} from "../../APIRequest/SummaryAPIRequest.js";
import {Toaster} from "react-hot-toast";

const Dashboard = () => {


    useEffect(() => {
        (async ()=>{
            await ExpensesSummary();
            await SalesSummary();
            await PurchaseSummary();
            await ReturnSummary();
        })()
    }, []);

    let ExpenseChart = useSelector((state) => state.dashboard.ExpenseChart);
    let ExpenseTotal = useSelector((state) => state.dashboard.ExpenseTotal);


let SaleChart = useSelector((state) => state.dashboard.SaleChart);
let SaleTotal = useSelector((state) => state.dashboard.SaleTotal);

let ReturnChart = useSelector((state) => state.dashboard.ReturnChart);
let ReturnTotal = useSelector((state) => state.dashboard.ReturnTotal);


let PurchaseChart = useSelector((state) => state.dashboard.PurchaseChart);
let PurchaseTotal = useSelector((state) => state.dashboard.PurchaseTotal);
    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                <span className="text-xl font-semibold">
                   {currencyFormatter.format(ExpenseTotal, { code: 'USD' })}
                </span>
                            <p className="text-gray-600">Total Expense</p>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                <span className="text-xl font-semibold">
                     {currencyFormatter.format(SaleTotal, { code: 'USD' })}
                </span>
                            <p className="text-gray-600">Total Sale</p>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                <span className="text-xl font-semibold">
                    {currencyFormatter.format(PurchaseTotal, { code: 'USD' })}
                </span>
                            <p className="text-gray-600">Total Purchase</p>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                <span className="text-xl font-semibold">
                     {currencyFormatter.format(ReturnTotal, { code: 'USD' })}
                </span>
                            <p className="text-gray-600">Total Return</p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                            <span className="text-lg font-semibold">Expense Last 30 Days</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart width={500} height={200} data={ExpenseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                            <span className="text-lg font-semibold">Sales Last 30 Days</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart width={500} height={200} data={SaleChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="TotalAmount" stroke="#8884d8" fill="#8884d8" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                            <span className="text-lg font-semibold">Purchase Last 30 Days</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart width={500} height={200} data={PurchaseChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="TotalAmount" stroke="#00A884" fill="#00A884" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <div className="p-2">
                        <div className="bg-white shadow rounded-lg p-4">
                            <span className="text-lg font-semibold">Return Last 30 Days</span>
                            <ResponsiveContainer className="mt-4" width="100%" height={200}>
                                <AreaChart width={500} height={200} data={ReturnChart} margin={{top: 10, right: 30, left: 0, bottom: 0,}}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="_id" />
                                    <YAxis />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="TotalAmount" stroke="#CB0C9F" fill="#CB0C9F" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center"/>
        </MasterLayout>
    );
};

export default Dashboard;