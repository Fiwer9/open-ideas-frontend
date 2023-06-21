import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../services/getLoginService/LoginSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
