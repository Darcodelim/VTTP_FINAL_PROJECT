import { createAction, props } from "@ngrx/store";
import { User } from "../../../Models/User";

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';

export const SIGNUP_SUCCESS = '[auth page] signup successs';

export const loginStart = createAction(LOGIN_START,props<{user:User}>())
export const loginSuccess =  createAction(LOGIN_SUCCESS,props<{loginStatus:boolean}>())
export const loginFail = createAction(LOGIN_FAIL,props<{error:string}>())


export const signUpStart = createAction(SIGNUP_START,props<{user:User}>())
export const signUpSuccess = createAction(SIGNUP_SUCCESS,props<{user:User}>())


