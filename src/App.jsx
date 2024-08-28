import React, { Fragment } from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from "./Pages/Users/Login-page.jsx";
import RegistrationPage from "./Pages/Users/Registration-page.jsx";
import SendOtpPage from "./Pages/Users/SendOtp-page.jsx";
import VerifyOtpPage from "./Pages/Users/VerifyOtp-page.jsx";
import CreatePasswordPage from "./Pages/Users/CreatePassword-page.jsx";
import {getToken} from "./Helper/sessionHelper.js";
import ProfilePage from "./Pages/Users/Profile-page.jsx";
import BrandListPage from "./Pages/Brand/BrandList-Page.jsx";
import CategoryListPage from "./Pages/Category/CategoryList-page.jsx";
import CustomerListPage from "./Pages/Customers/CustomerList-page.jsx";
import SupplierListPage from "./Pages/Suppliers/SupplierList-page.jsx";
import ExpenseTypeListPage from "./Pages/ExpenseType/ExpenseTypeList-page.jsx";
import ExpenseListPage from "./Pages/Expense/ExpenseList-page.jsx";
import ProductListPage from "./Pages/Product/ProductList-page.jsx";
import PurchaseListPage from "./Pages/Purchase/PurchaseList-page.jsx";
import SalesListPage from "./Pages/Sales/SalesList-Page.jsx";
import ReturnListPage from "./Pages/Return/ReturnList-Page.jsx";
import CustomerCreateUpdatePage from "./Pages/Customers/Customer-CreateUpdate-Page.jsx";
import SupplierCreateUpdatePage from "./Pages/Suppliers/Supplier-CreateUpdate-page.jsx";
import CreateUpdateExpenseTypeListPage from "./Pages/ExpenseType/CreateUpdate-ExpenseTypeList-Page.jsx";
import CreateUpdateBrandListPage from "./Pages/Brand/CreateUpdate-BrandList-page.jsx";
import CreateUpdateCategoryListPage from "./Pages/Category/CreateUpdate-categoryList-Page.jsx";
import CreateUpdateProductListPage from "./Pages/Product/CreateUpdate-ProductList-Page.jsx";
import ExpenseCreateUpdatePage from "./Pages/Expense/ExpenseCreateUpdate-page.jsx";
import SalesCreateUpdatePage from "./Pages/Sales/Sales-CreateUpdate-Page.jsx";
import PurchaseCreatePage from "./Pages/Purchase/PurchaseCreate-Page.jsx";
import ReturnCreatePage from "./Pages/Return/ReturnCreate-Page.jsx";
import ExpenseReportPage from "./Pages/Report/ExpenseReport-page.jsx";
import SaleReportPage from "./Pages/Report/SaleReport-page.jsx";
import PurchaseReportPage from "./Pages/Report/PurchaseReport-page.jsx";
import ReturnReportPage from "./Pages/Report/ReturnReport-page.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

const App =  () => {
    const token = getToken();

    return (
        <Fragment>
            <BrowserRouter>
                <Routes>
                    {
                        token ?
                            (
                                <>
                                    <Route path='/' element={<Dashboard/>}/>
                                    <Route path='/UserProfile' element={<ProfilePage/>}/>

                                    <Route path="/BrandList" element={<BrandListPage/>}/>
                                    <Route path="/CreateUpdate-BrandList" element={<CreateUpdateBrandListPage/>}/>

                                    <Route path="/categoryList" element={<CategoryListPage/>}/>
                                    <Route path="/CreateUpdate-CategoryList" element={<CreateUpdateCategoryListPage/>}/>

                                    <Route path="/CustomerCreateUpdatePage" element={<CustomerCreateUpdatePage/>}/>
                                    <Route path="/customerList" element={<CustomerListPage/>}/>

                                    <Route path="/supplierList" element={<SupplierListPage/>}/>
                                    <Route path="/Create-Update-Supplier" element={<SupplierCreateUpdatePage/>}/>

                                    <Route path="/Create-Update-expenseType" element={<CreateUpdateExpenseTypeListPage/>}/>
                                    <Route path="/expenseTypeList" element={<ExpenseTypeListPage/>}/>

                                    <Route path="/ExpenseList" element={<ExpenseListPage/>}/>
                                    <Route path="/ExpenseCreateUpdate" element={<ExpenseCreateUpdatePage/>}/>

                                    <Route path="/ProductList" element={<ProductListPage/>}/>
                                    <Route path="/CreateUpdateProductList" element={<CreateUpdateProductListPage/>}/>

                                    <Route path="/PurchaseList" element={<PurchaseListPage/>}/>
                                    <Route path="/CreatePurchase" element={<PurchaseCreatePage/>}/>

                                    <Route path="/SalesList" element={<SalesListPage/>}/>
                                    <Route path="/SalesCreateUpdate" element={<SalesCreateUpdatePage/>}/>

                                    <Route path="/ReturnList" element={<ReturnListPage/>}/>
                                    <Route path="/ReturnListUpdateCreate" element={<ReturnCreatePage/>}/>

                                    <Route path="/ExpenseReport" element={<ExpenseReportPage/>}/>
                                    <Route path="/SaleReport" element={<SaleReportPage/>}/>
                                    <Route path="/PurhcaseReport" element={<PurchaseReportPage/>}/>
                                    <Route path="/ReturnReport" element={<ReturnReportPage/>}/>

                                    <Route path="*" element={<NotFound/>}/>
                                </>
                            )
                            :
                            (
                                <>
                                    <Route path='/*' element={<Navigate to="/login"/>}/>
                                    <Route path='/' element={<Navigate to="/login"/>}/>
                                    <Route path="/Registration" element={<RegistrationPage/>}/>
                                    <Route path="/login" element={<LoginPage/>}/>
                                    <Route path="/ForgetPassword" element={<SendOtpPage/>}/>
                                    <Route path="/verifyOTP" element={<VerifyOtpPage/>}/>
                                    <Route path="/createPassword" element={<CreatePasswordPage/>}/>
                                    <Route path="*" element={<NotFound/>}/>
                                </>
                            )
                    }
                </Routes>
            </BrowserRouter>
        </Fragment>
    );
};

export default App;
