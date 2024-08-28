import React, { useRef } from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import SubmitButton from "../SubmitButton.jsx";
import { isEmpty } from "../../Helper/FormHelper.js";
import toast, { Toaster } from "react-hot-toast";
import {useSelector} from "react-redux";
import currencyFormatter from "currency-formatter";
import exportFromJSON from "export-from-json";
import moment from "moment";
import {ReturnReportByDateRequest} from "../../APIRequest/ReportAPIRequest.js";
const ReturnReport = ()=> {
    const FromDateRef = useRef();
    const ToDateRef = useRef();

    const ReturnListByDate=useSelector((state)=>state.Report.ReturnByDateList)
    const CreateReport = async () => {
        let FromDate = FromDateRef.current.value;
        let ToDate = ToDateRef.current.value;

        if (isEmpty(FromDate)) {
            toast.error("From Date is required");
        } else if (isEmpty(ToDate)) {
            toast.error("To Date is required");
        } else {
            await ReturnReportByDateRequest(FromDate,ToDate);

        }
    }

    const onExportData=async (ReportType,Data)=>{
        let FileName="Purchase Report";
        if(Data.length>0){
            let ReportData=[];
            Data.map((item)=>{
                let itemList={
                    "Product Name":item['Products']['name'],
                    "Brand Name":item['brand']['name'],
                    "Category":item['category']['name'],
                    "Unit":item['Products']['unit'],
                    "Unit Cost":item['unitCost'],
                    "Total":item['Total'],
                    "Details":item['Products']['details'],
                    "Date":moment(item['createDate']).format('MMMM Do YYYY')
                }
                ReportData.push(itemList)
            })
            exportFromJSON({ data: ReportData, fileName: FileName, exportType: ReportType});
        }

    }

    return (
        <MasterLayout>
            <div className="container mx-5">
                <div className="flex justify-center items-center">
                    <div className="w-full">
                        <div className="shadow-lg border w-5/6 h-auto bg-white rounded-md p-5">
                            <div className="flex justify-center items-center font-semibold text-lg mt-4 mb-2 bg-green-50 rounded-md py-1">
                                <h2>Return Report</h2>
                            </div>
                            <hr />
                            <div className="p-5 flex justify-between w-full space-x-5 mt-5">
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <label className="font-semibold">From Date</label>
                                    <input
                                        ref={FromDateRef}
                                        className="rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                        placeholder="mm/dd/yyyy"
                                        type="date"
                                    />
                                </div>
                                <div className="flex flex-col space-y-1 w-1/2">
                                    <label className="font-semibold">To Date</label>
                                    <input
                                        ref={ToDateRef}
                                        className="rounded-md py-2 px-3 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-green-800 hover:bg-green-50 transition duration-150"
                                        placeholder="mm/dd/yyyy"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <SubmitButton
                                    onClick={CreateReport}
                                    className="bg-green-800 rounded-md px-8 py-1 text-white font-semibold ring-2 ring-green-500 hover:bg-green-600 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-800"
                                    text="Create"
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            {
                                ReturnListByDate.length>0?(
                                    <div className="shadow-lg border w-5/6 h-auto bg-white rounded-md p-5">
                                        <div className="flex justify-center items-center bg-green-50 py-2 text-lg font-semibold">
                                            <h2>Download Report</h2>
                                        </div>
                                        <div className="mt-5 font-semibold">
                                            <h6>Total:<span className="text-gray-700"> {currencyFormatter.format(ReturnListByDate[0]['Total'][0]['TotalAmount'],{code:"USD"})}</span></h6>
                                        </div>
                                        <div className="flex justify-center items-center p-8">
                                            <div className="flex space-x-6">
                                                <button onClick={()=>onExportData('csv',ReturnListByDate[0]['Rows'])} className="bg-green-700 rounded-md px-5 py-1 text-white font-semibold ring-2 ring-green-500 hover:bg-green-600 hover:ring-green-800 ">Download CSV</button>
                                                <button onClick={()=>onExportData('xls',ReturnListByDate[0]['Rows'])} className="bg-green-700 rounded-md px-5 py-1 text-white font-semibold ring-2 ring-green-500 hover:bg-green-600 hover:ring-green-800 ">Download XLS</button>
                                            </div>
                                        </div>

                                    </div>
                                ):(
                                    <div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center" />
        </MasterLayout>
    );
};
export default ReturnReport;