
import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import ReactPaginate from "react-paginate";
import {Toaster} from "react-hot-toast";
import {useSelector} from "react-redux";
import {CiEdit} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import {DeleteExpenseRequest, expenseApiRequest} from "../../APIRequest/ExpensesAPIRequest.js";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {DeleteHelper} from "../../Helper/DeleteHelper.js";
import {customerListRequest} from "../../APIRequest/CustomerAPIRequest.js";

const ExpenseList =()=> {

    let [perPage,setPerPage]=useState(5);
    let [searchArray,setSearchArray]=useState('0');

    useEffect( () => {

        (async () => {
            await expenseApiRequest(1, perPage, searchArray);
        })()

    }, []);

    const TotalExpenseType=useSelector((state)=>(state.expense.TotalExpenseList));
    const ListOfExpenseType=useSelector((state)=>state.expense.List);

    const handlePageClick=async (e) => {
        await expenseApiRequest(e.selected+1,perPage,searchArray);
    }
    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value))
        await expenseApiRequest(1,e.target.value,searchArray)
    }
    const searchKeywordOnChange=async (e)=>{
        setSearchArray(e.target.value);
        if((e.target.value).length===0){
            setSearchArray('0');
            await expenseApiRequest(1,perPage,'0');
        }
    }

    const searchData=async () => {
        await expenseApiRequest(1, perPage, searchArray)
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const doDelete=async(id)=>{
         const res=await DeleteHelper();
         if(res.isConfirmed){
             const result=await DeleteExpenseRequest(id);
             if(result){
                 await expenseApiRequest (1, perPage, searchArray);
             }

         }
    }


    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="flex justify-center mt-12">
                    <div className="shadow-lg w-11/12 rounded-md border bg-white p-4 pt-8">

                        <div className="flex justify-between flex-wrap">
                            <div className="pl-5 text-xl font-semibold">
                                <h2>Expense List</h2>
                            </div>
                            <div  className="flex space-x-3 items-center">
                                <input onKeyUp={TextSearch} type="text" className="w-48 py-1 ring-1 ring-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-gray-700" placeholder="PageNo"/>
                                <div className="col-2 ">
                                    <select onChange={perPageOnChange} className="w-48 py-1 ring-1 ring-gray-400 rounded-md px-4 focus:outline-none focus:ring-1 focus:ring-gray-700" >
                                        <option value="5">5 Per Page</option>
                                        <option value="10">10 Per Page</option>
                                        <option value="15">15 Per Page</option>
                                        <option value="20">20 Per Page</option>
                                        <option value="30">30 Per Page</option>
                                        <option value="50">50 Per Page</option>
                                        <option value="100">100 Per Page</option>
                                        <option value="100">200 Per Page</option>
                                    </select>
                                </div>
                                <div className="flex">
                                    <input
                                        onChange={searchKeywordOnChange}
                                        type="text"
                                        className="w-full py-1 ring-1 ring-gray-400 rounded-l-md px-4 focus:outline-none focus:ring-1 focus:ring-gray-700 "
                                        placeholder="Search here.."/>
                                    <button onClick={searchData} className="py-1 ring-1 ring-gray-400 rounded-r-md px-4 bg-green-700 text-white opacity-80 ">Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center overflow-x-auto mt-10">
                            <table className="min-w-full table-auto">
                                <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left">No</th>
                                    <th className="px-4 py-2 text-left">Type</th>
                                    <th className="px-4 py-2 text-left">Amount</th>
                                    <th className="px-4 py-2 text-left">Note</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                                </thead>
                                <tbody className="space-y-2">

                                {
                                    ListOfExpenseType.map((item,index)=>
                                        <tr className="bg-white border-b">
                                            <td className="px-4 py-2">{index+1}</td>
                                            <td className="px-4 py-2">{item['Type'][0]['name']}</td>
                                            <td className="px-4 py-2">  <p>{currencyFormatter.format(item['Amount'], { locale: 'en-US' })}</p> </td>
                                            <td className="px-4 py-2"> {item['Note']} </td>
                                            <td className="px-4 py-2">
                                                <div className="flex space-x-5 items-center">
                                                    <Link to={`/ExpenseCreateUpdate?id=${item['_id']}`}>
                                                        <CiEdit className=" text-gray-500 hover:transtion hover:translate-y-1 hover:scale-110 hover:text-black hover:duration-300" size={25}/>
                                                    </Link>
                                                    <button onClick={()=>doDelete(item['_id'])}>
                                                        <AiOutlineDelete className=" text-gray-500 hover:transtion hover:translate-y-1 hover:scale-110 hover:text-black hover:duration-300" size={22}/>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    )

                                }

                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10">
                            <nav aria-label="Page navigation">
                                <ReactPaginate
                                    previousLabel="&lt;"
                                    nextLabel="&gt;"
                                    pageClassName="inline-block"
                                    pageLinkClassName="py-2 px-4 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md hover:bg-green-100 transition duration-300 ease-in-out"
                                    previousClassName="inline-block"
                                    previousLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-green-200 transition duration-300 ease-in-out"
                                    nextClassName="inline-block"
                                    nextLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-green-200 transition duration-300 ease-in-out"
                                    breakLabel="..."
                                    breakClassName="inline-block"
                                    breakLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-md hover:bg-green-100 transition duration-300 ease-in-out"
                                    pageCount={Math.ceil(TotalExpenseType / perPage)}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={handlePageClick}
                                    containerClassName="flex justify-center mt-4 space-x-2"
                                    activeClassName="bg-green-500 text-black  ring-2 ring-pink-500 "
                                    disabledClassName="opacity-50 cursor-not-allowed"
                                />
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
            <Toaster position="bottom-center"/>

        </MasterLayout>
    );
};

export default ExpenseList;