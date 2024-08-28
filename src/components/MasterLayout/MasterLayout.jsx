import React, {useEffect, useRef, useState} from 'react';
import {AiOutlineLogout, AiOutlineMenuFold, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiUsers, FiLogOut } from "react-icons/fi";
import logo from '../../assets/image/Logo (1).svg';
import {MdDashboard, MdPeopleOutline} from "react-icons/md";
import {Link} from "react-router-dom";
import {TfiAngleDown, TfiAngleUp} from "react-icons/tfi";
import {TbTruckDelivery} from "react-icons/tb";
import {RiMoneyDollarCircleLine} from "react-icons/ri";
import {BsArrowRightCircle, BsBox, BsCircle} from "react-icons/bs";
import {BiPurchaseTag} from "react-icons/bi";
import {PiKeyReturnDuotone} from "react-icons/pi";
import {GoGraph} from "react-icons/go";
import {getUserDetails, removeSession} from "../../Helper/sessionHelper.js";
import {store} from "../../Redux/store/store.js";
import {setActiveValue, setCheckItemActiveValue} from "../../Redux/state-slice/setting-slice.js";
import {useSelector} from "react-redux";

const MasterLayout = (props) => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeItem, setActiveItem]=useState(null);

    const [isUserDialogOpen, setUserDialogOpen]=useState(false);

    let activeCheck=useSelector((state)=>state.settings.activeValue)
    let checkActiveItem=useSelector((state)=>state.settings.checkItemValue);

    const handleMenuClick=(menu)=>{
        if(activeCheck===menu){
            store.dispatch(setActiveValue(""));
        }
        else{store.dispatch(setActiveValue(menu))}
    }

    const handleSubMenuClick=(submenu)=>{
        store.dispatch(setCheckItemActiveValue(submenu))
    }

    const toggleSubmenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };
    const DoLogout=()=>{
        removeSession();
    }
    const dialogRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dialogRef.current && !dialogRef.current.contains(event.target)) {
                setUserDialogOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const MenuListCss='hover:border-l-4 hover:border-green-900 flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-200 cursor-pointer'
    const SubmenuListCss='flex items-center space-x-1 px-4 py-2 text-gray-600  rounded-md cursor-pointer'

    return (
        <div className="flex min-h-screen bg-gray-100 ">
            <div className={`${sidebarOpen ? 'w-72' : 'w-12  lg:w-14'}  bg-white shadow-xl border-r transition-all duration-500 py-8`}>
                <div className="flex justify-center items-center p-4">
                    <img src={logo} alt="Inventory" className={`${sidebarOpen ? 'h-14 w-14':'w-8 h-8'} rounded-full  transition-all duration-300`} />
                </div>
                <nav className="mt-5">
                    <ul className="space-y-2">
                        <li>
                            <div className={MenuListCss}>
                                <Link to="/" className="flex items-center"
                                      onClick={()=>handleMenuClick('Dashboard')}>
                                    <MdDashboard className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen ? 'block' : 'hidden'} ml-2`}>Dashboard</span>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div
                                className={MenuListCss}
                                onClick={()=>handleMenuClick('Customer')}>
                                <div className="flex items-center">
                                    <MdPeopleOutline className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen ? 'block' : 'hidden'} ml-2`}>Customer</span>
                                </div>
                                {sidebarOpen && <span>{activeCheck === 'Customer' ? <TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div
                                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                                    activeCheck === "Customer" && sidebarOpen ? 'max-h-40' : 'max-h-0'
                                }`}
                            >
                                <ul className="mt-2 ml-14 space-y-1">
                                    <li>
                                        <Link to="/CustomerCreateUpdatePage" className={ ` ${SubmenuListCss} ${checkActiveItem==='NewCustomer'?'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('NewCustomer')}>
                                            <div>
                                                {checkActiveItem==='NewCustomer'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>New Customer</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/CustomerList" className={` ${SubmenuListCss} ${checkActiveItem === 'Customer List' ? 'bg-gray-200' : 'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('Customer List')}>
                                        <div>
                                            {checkActiveItem==='Customer List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                        </div>
                                        <p>Customer List</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        <li>
                            <div
                                 className={MenuListCss}
                                 onClick={()=>handleMenuClick('Supplier')}>
                                <div className="flex items-center">
                                    <TbTruckDelivery className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Suppliers</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Supplier'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Supplier'?'max-h-40':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                  <li>
                                      <Link to="/Create-Update-Supplier" className={`${SubmenuListCss} ${checkActiveItem ==='NewSupplier'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                            onClick={()=>handleSubMenuClick('NewSupplier')}>
                                          <div>
                                              {checkActiveItem==='NewSupplier'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                          </div>
                                          <p> New Supplier</p>
                                      </Link>
                                  </li>

                                    <li>
                                        <Link to="/supplierList" className={`${SubmenuListCss} ${checkActiveItem ==='SupplierList'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('SupplierList')}>
                                            <div>
                                                {checkActiveItem==='SupplierList'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>Supplier List</p>
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </li>


                        <li>
                            <div
                                 className={MenuListCss}
                                 onClick={()=>handleMenuClick('Expense')}>
                                <div className="flex items-center">
                                    <RiMoneyDollarCircleLine  className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Expense</span>
                                </div>
                                {sidebarOpen && <span>{activeCheck ==='Expense'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${activeCheck==='Expense'?'max-h-52':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                    <li>
                                        <Link to="/Create-Update-expenseType" className={`${SubmenuListCss} ${checkActiveItem ==='New Expense Type'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('New Expense Type')}>
                                            <div>
                                                {checkActiveItem==='New Expense Type'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p> New Expense Type</p>
                                        </Link>
                                    </li>

                                   <li>
                                       <Link to="/expenseTypeList" className={`${SubmenuListCss} ${checkActiveItem ==='New Expense Type List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('New Expense Type List')}>
                                           <div>
                                               {checkActiveItem==='New Expense Type List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Expense Type List</p>
                                       </Link>
                                   </li>

                                    <li>
                                        <Link to="/ExpenseCreateUpdate" className={`${SubmenuListCss} ${checkActiveItem ==='New Expense'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('New Expense')}>
                                            <div>
                                                {checkActiveItem==='New Expense'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p> New Expense</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/ExpenseList" className={`${SubmenuListCss} ${checkActiveItem ==='Expense List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('Expense List')}>
                                            <div>
                                                {checkActiveItem==='Expense List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>Expense List</p>
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        </li>

                        <li>
                            <div  className={MenuListCss}
                                 onClick={()=>handleMenuClick('Products')}>
                                <div className="flex items-center">
                                    <BsBox className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Products</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Products'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Products'?'max-h-72':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                    <li>
                                        <Link to="/CreateUpdate-BrandList" className={`${SubmenuListCss} ${checkActiveItem ==='New Brand'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('New Brand')}>
                                            <div>
                                                {checkActiveItem==='New Brand'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p> New Brand</p>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/BrandList" className={`${SubmenuListCss} ${checkActiveItem ==='Brand List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('Brand List')}>
                                            <div>
                                                {checkActiveItem==='Brand List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>Brand List</p>
                                        </Link>
                                    </li>
                                    <Link to="/CreateUpdate-CategoryList" className={`${SubmenuListCss}r ${checkActiveItem ===' New Category'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                        onClick={()=>handleSubMenuClick(' New Category')}>
                                        <div>
                                            {checkActiveItem===' New Category'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                        </div>
                                        <p> New Category</p>
                                    </Link>
                                    <li>
                                        <Link to="/categoryList" className={`${SubmenuListCss} ${checkActiveItem ==='Category List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('Category List')}>
                                            <div>
                                                {checkActiveItem==='Category List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>Category List</p>
                                        </Link>
                                    </li>
                                   <li>
                                       <Link to="/CreateUpdateProductList" className={`${SubmenuListCss} ${checkActiveItem ==='New Product'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('New Product')}>
                                           <div>
                                               {checkActiveItem==='New Product'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p> New Product</p>
                                       </Link>
                                   </li>
                                   <li>
                                       <Link to="/ProductList" className={`${SubmenuListCss} ${checkActiveItem ==='Product List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Product List')}>
                                           <div>
                                               {checkActiveItem==='Product List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Product List</p>
                                       </Link>
                                   </li>
                                </ul>

                            </div>
                        </li>

                        <li>
                            <div
                                 className={MenuListCss}
                                 onClick={()=>handleMenuClick('Purchase')}>
                                <div className="flex items-center">
                                    <BiPurchaseTag className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Purchase</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Purchase'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Purchase'?'max-h-40':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                   <li>
                                       <Link to="/CreatePurchase" className={`${SubmenuListCss} ${checkActiveItem ==='New Purchase'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('New Purchase')}>
                                           <div>
                                               {checkActiveItem==='New Purchase'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p> New Purchase</p>
                                       </Link>
                                   </li>
                                   <li>
                                       <Link to="/PurchaseList" className={`${SubmenuListCss} ${checkActiveItem ==='Purchase List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Purchase List')}>
                                           <div>
                                               {checkActiveItem==='Purchase List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Purchase List</p>
                                       </Link>
                                   </li>
                                </ul>

                            </div>
                        </li>

                        <li>
                            <div
                                 className={MenuListCss}
                                 onClick={()=>handleMenuClick('Sale')}>
                                <div className="flex items-center">
                                    <AiOutlineShoppingCart className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Sale</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Sale'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Sale'?'max-h-40':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                    <li>
                                        <Link to="/SalesCreateUpdate" className={`${SubmenuListCss} ${checkActiveItem ==='New Sale'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('New Sale')}>
                                            <div>
                                                {checkActiveItem==='New Sale'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p> New Sale</p>
                                        </Link>
                                    </li>
                                   <li>
                                       <Link to="/SalesList" className={`${SubmenuListCss} ${checkActiveItem ==='Sale List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Sale List')}>
                                           <div>
                                               {checkActiveItem==='Sale List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Sale List</p>
                                       </Link>
                                   </li>
                                </ul>

                            </div>
                        </li>

                        <li>
                            <div
                                 className={MenuListCss}
                                 onClick={()=>handleMenuClick('Return')}>
                                <div className="flex items-center">
                                    <PiKeyReturnDuotone className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Return</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Return'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Return'?'max-h-40':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                   <li>
                                       <Link to="/ReturnListUpdateCreate" className={`${SubmenuListCss} ${checkActiveItem ==='New Return'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('New Return')}>
                                           <div>
                                               {checkActiveItem==='New Return'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p> New Return</p>
                                       </Link>
                                   </li>
                                   <li>
                                       <Link to="/ReturnList" className={`${SubmenuListCss} ${checkActiveItem ==='Return List'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Return List')}>
                                           <div>
                                               {checkActiveItem==='Return List'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Return List</p>
                                       </Link>
                                   </li>
                                </ul>

                            </div>
                        </li>

                        <li>
                            <div  className={MenuListCss}
                                 onClick={()=>handleMenuClick('Report')}>
                                <div className="flex items-center">
                                    <GoGraph className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen?'block':'hidden'} ml-2`}>Report</span>
                                </div>
                                {sidebarOpen &&<span>{activeCheck ==='Report'?<TfiAngleUp />: <TfiAngleDown/>}</span>}
                            </div>
                            <div className={`overflow-hidden transition-max-height duration-500 ease-in-out ${ activeCheck==='Report'?'max-h-64':'max-h-0'}`}>
                                <ul className="mt-2 ml-14 space-y-1">
                                   <li>
                                       <Link to="/SaleReport" className={`${SubmenuListCss} ${checkActiveItem ==='Sale Report'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Sale Report')}>
                                           <div>
                                               {checkActiveItem==='Sale Report'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p> Sale Report</p>
                                       </Link>
                                   </li>
                                    <li>
                                        <Link to="/ReturnReport" className={`${SubmenuListCss} ${checkActiveItem ==='Return Report'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                              onClick={()=>handleSubMenuClick('Return Report')}>
                                            <div>
                                                {checkActiveItem==='Return Report'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                            </div>
                                            <p>Return Report</p>
                                        </Link>
                                    </li>
                                   <li>
                                       <Link to="/PurhcaseReport" className={`${SubmenuListCss} ${checkActiveItem ==='Purchase Report'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Purchase Report')}>
                                           <div>
                                               {checkActiveItem==='Purchase Report'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p> Purchase Report</p>
                                       </Link>
                                   </li>
                                   <li>
                                       <Link to="/ExpenseReport" className={`${SubmenuListCss} ${checkActiveItem ==='Expense Report'? 'bg-gray-200':'hover:bg-gray-200'}`}
                                             onClick={()=>handleSubMenuClick('Expense Report')}>
                                           <div>
                                               {checkActiveItem==='Expense Report'? <BsArrowRightCircle className="text-red-700"/>:<BsCircle/>}
                                           </div>
                                           <p>Expense Report</p>
                                       </Link>
                                   </li>
                                </ul>

                            </div>
                        </li>

                        <li onClick={DoLogout} className={MenuListCss}>
                                <div className="flex items-center">
                                    <FiLogOut className="mr-2 text-xl text-gray-500" />
                                    <span className={`${sidebarOpen ? 'block' : 'hidden'} ml-2`}>Logout</span>
                                </div>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className="w-full flex flex-col">
                <div className="h-14 bg-green-700 opacity-80 shadow-md flex justify-between items-center px-8 text-white ">
                    <div className="flex items-center">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-white focus:outline-none">

                            <AiOutlineMenuFold className={`h-6 w-6 transition-max-height duration-500 ${sidebarOpen? 'transition rotate-180':''}`}/>
                        </button>
                    </div>
                    <div className="flex items-center relative">
                        {
                            getUserDetails()['photo']?
                                <div className="w-10 h-10 rounded-full shadow-lg overflow-hidden ring-1 ring-purple-500">
                                    <img onClick={() => setUserDialogOpen(!isUserDialogOpen)} src={getUserDetails()['photo']} className="w-full h-full object-cover"/>
                                </div>
                                :
                                <CgProfile
                                    className="w-8 h-8 cursor-pointer"
                                    onClick={() => setUserDialogOpen(!isUserDialogOpen)}
                                />
                        }
                        {isUserDialogOpen && (
                            <div
                                className={`w-52 drop-shadow-lg bg-white absolute right-0 top-full mt-3 p-4 rounded-md border-gray-300 z-0`}
                                ref={dialogRef}
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        className="h-12 w-12 rounded-full ring-2 ring-purple-500 object-cover"
                                        src={getUserDetails()['photo']}
                                        alt="profile Image"

                                    />
                                    <h5 className="text-center mt-2 text-gray-700">{getUserDetails()['firstName']+" "+getUserDetails()['lastName']}</h5>
                                </div>
                                <hr className="mt-5" />
                                <div className="space-y-2 mt-2 text-gray-700">
                                    <Link
                                        to="/UserProfile"
                                        className="flex items-center space-x-2 hover:bg-pink-200 hover:border-2 hover:border-l-pink-600 px-2 py-1 rounded-md"
                                    >
                                        <AiOutlineUser className="w-5 h-5 text-gray-700" />
                                        <span>Profile</span>
                                    </Link>
                                    <div className="hover:bg-pink-200 hover:border-2 hover:border-l-pink-600 px-2 py-1 rounded-md">
                                        <button onClick={DoLogout} className="flex items-center space-x-2">
                                            <AiOutlineLogout className="w-5 h-5 text-gray-700" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-1 p-6 bg-gray-50">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default MasterLayout;
