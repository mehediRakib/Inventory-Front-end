import {configureStore} from "@reduxjs/toolkit";
import  profileReducer from '../state-slice/profile-slice.js'
import spinnerReducer from '../state-slice/spinner-slice.js';
import brandReducer from '../state-slice/brand-slice.js';
import categoryReducer from '../state-slice/category-slice.js'
import customerReducer from '../state-slice/customer-slice.js';
import supplierReducer from '../state-slice/suppliers-slice.js';
import expenseTypeReducer from '../state-slice/expenseType-slice.js';
import expenseReducer from '../state-slice/expense-slice.js';
import productReducer from '../state-slice/product-slice.js';
import PurchaseReducer from '../state-slice/purchase-slice.js';
import SalesReducer from '../state-slice/sales-slice.js';
import ReturnReducer from '../state-slice/return-slice.js';
import dashboardReducer from "../state-slice/dashboard-slice.js";
import reportReducer from '../state-slice/report-slice.js';
import settingReducer from '../state-slice/setting-slice.js'


export const store=configureStore({
    reducer:{
        profile:profileReducer,
        spinner:spinnerReducer,
        brand:brandReducer,
        category:categoryReducer,
        customer:customerReducer,
        supplier:supplierReducer,
        expenseType:expenseTypeReducer,
        expense:expenseReducer,
        product:productReducer,
        purchase:PurchaseReducer,
        sale:SalesReducer,
        Return:ReturnReducer,
        dashboard:dashboardReducer,
        Report:reportReducer,
        settings:settingReducer
    }
})