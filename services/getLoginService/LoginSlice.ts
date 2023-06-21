import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {AnyAction} from "redux";
import {ThunkDispatch} from 'redux-thunk'
import { login, logout } from "./LoginService";

const initialState = {
    user: null,
    error: null,
    isLoading: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload?.data;
        },
        logoutStart: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.user = null;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
} = authSlice.actions;

export const loginUser = (email: string) => async (dispatch: ThunkDispatch<any, any, AnyAction>) => {
    try {
        dispatch(loginStart());
        const user = await login(email);
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error));
    }
};

export const logoutUser = () => async (dispatch: Dispatch) => {
    try {
        dispatch(logoutStart());
        await logout();
        dispatch(logoutSuccess());
    } catch (error) {
        dispatch(logoutFailure(error));
    }
};

export default authSlice.reducer;
