import { createFeatureSelector, createSelector } from "@ngrx/store";
import { LoginState, loginErrorState } from "./auth.state";

export const LOGIN_STATE_NAME='User Login or Registered';
export const ERROR_STATE_NAME='Error';

const getLoginState=createFeatureSelector<LoginState>(LOGIN_STATE_NAME);
const getErrorState=createFeatureSelector<loginErrorState>(ERROR_STATE_NAME)

export const isLoginRegistered = createSelector(getLoginState,state=>{
    return state
})

export const geterror = createSelector(getErrorState,state=>{
    return state.loginError
})

