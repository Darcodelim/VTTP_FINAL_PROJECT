import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState } from "./auth.state";

export const AUTH_STATE_NAME='User';


const getAuthState=createFeatureSelector<LoginState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState,state=>{
    return state.loginStatus? true:false;
})

