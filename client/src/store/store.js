import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice"
import AdminProductsSlice from "./admin/products-slice"
import shopProductsSlice from "./shop/index";
const store = configureStore({
    reducer : {
        auth: authReducer,
        adminProducts : AdminProductsSlice,
        shopProducts : shopProductsSlice
    },
})

export default store
