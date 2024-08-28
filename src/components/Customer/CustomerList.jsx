import React, {useEffect, useState} from 'react';
import MasterLayout from "../MasterLayout/MasterLayout.jsx";
import {customerListRequest, DeleteCustomerRequest} from "../../APIRequest/CustomerAPIRequest.js";
import {useSelector} from "react-redux";
import {Toaster} from "react-hot-toast";
import {CiEdit} from "react-icons/ci";
import {AiOutlineDelete} from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {Link} from "react-router-dom";
import {DeleteHelper} from "../../Helper/DeleteHelper.js";

const CustomerList = () => {
    let [perPage,setPerPage]=useState(5);
    let [searchArray,setSearchArray]=useState('0');

    useEffect( () => {
        (async () => {
            await customerListRequest(1, perPage, searchArray);
        })()

    }, []);

    const ListOfCustomer=useSelector((state)=>(state.customer.List));
    const TotalCustomerList=useSelector((state)=>state.customer.TotalCustomer);

    const handlePageClick=async (e) => {
        await customerListRequest(e.selected+1,perPage,searchArray);
    }
    const perPageOnChange=async (e) => {
        setPerPage(parseInt(e.target.value))
        await customerListRequest(1,e.target.value,searchArray)
    }
    const searchKeywordOnChange=async (e)=>{
        setSearchArray(e.target.value);
        if((e.target.value).length===0){
            setSearchArray('0');
            await customerListRequest(1,perPage,'0');
        }
    }

    const searchData=async () => {
        await customerListRequest(1, perPage, searchArray)
    }

    const TextSearch = (e) => {
        const rows = document.querySelectorAll('tbody tr')
        rows.forEach(row => {
            row.style.display = (row.innerText.includes(e.target.value)) ? '' : 'none'
        })
    }

    const doDelete=async (id)=>{
        const res=await DeleteHelper();
        if(res.isConfirmed){
          const result=await DeleteCustomerRequest(id);
          if(result){
              await customerListRequest(1, perPage, searchArray);
          }

        }
    }
    return (
        <MasterLayout>
            <div className="container mx-auto px-4">
                <div className="flex justify-center mt-12">
                    <div className="shadow-lg w-11/12 rounded-md border bg-white p-4 pt-8 ">

                        <div className="flex justify-between flex-wrap">
                            <div className="pl-5 text-xl font-semibold">
                                <h2>Customer List</h2>
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
                                    <th className="px-4 py-2 text-left">Customer Name</th>
                                    <th className="px-4 py-2 text-left">Phone</th>
                                    <th className="px-4 py-2 text-left">Email</th>
                                    <th className="px-4 py-2 text-left">Action</th>
                                </tr>
                                </thead>
                                <tbody className="space-y-2">

                                {
                                    ListOfCustomer.map((item,index)=>
                                        <tr key={index } className="bg-white border-b">
                                            <td className="px-4 py-2">{index+1}</td>
                                            <td className="px-4 py-2">{item['customerName']}</td>
                                            <td className="px-4 py-2"> {item['phone']} </td>
                                            <td className="px-4 py-2"> {item['email']} </td>
                                            <td className="px-4 py-2">
                                                <div className="flex space-x-5 items-center">
                                                    <Link to={`/CustomerCreateUpdatePage?id=${item['_id']}`}>
                                                        <CiEdit className=" text-cyan-500 hover:transtion hover:translate-y-1 hover:scale-110 hover:text-black hover:duration-300" size={25}/>
                                                    </Link>
                                                    <button onClick={()=>doDelete(item['_id'])}>
                                                        <AiOutlineDelete className=" text-red-800 hover:transtion hover:translate-y-1 hover:scale-110 hover:text-black hover:duration-300" size={22}/>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    )

                                }

                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 ">
                            <nav aria-label="Page navigation">
                                <ReactPaginate
                                    previousLabel="&lt;"
                                    nextLabel="&gt;"
                                    pageClassName="inline-block"
                                    pageLinkClassName="py-2 px-4 text-gray-800 bg-white border border-gray-500 rounded-md shadow-md hover:bg-green-100 transition duration-300 ease-in-out"
                                    previousClassName="inline-block"
                                    previousLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-500 rounded-md shadow-md hover:bg-green-200 transition duration-300 ease-in-out"
                                    nextClassName="inline-block"
                                    nextLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-500 rounded-md shadow-md hover:bg-green-200 transition duration-300 ease-in-out"
                                    breakLabel="..."
                                    breakClassName="inline-block"
                                    breakLinkClassName="py-2 px-4 text-gray-700 bg-white border border-gray-500 rounded-md shadow-md hover:bg-green-100 transition duration-300 ease-in-out"
                                    pageCount={Math.ceil(TotalCustomerList / perPage)}
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


export default CustomerList;