import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartReducer";
import userReducer from "./reducers/userReducer";


export const store = configureStore({
    reducer: {
        cartSliceReducer: cartReducer,
        userReducer: userReducer,
    }
})