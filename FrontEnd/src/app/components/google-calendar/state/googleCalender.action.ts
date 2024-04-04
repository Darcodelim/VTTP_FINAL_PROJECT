import { createAction, props } from "@ngrx/store";

export const AUTHORIZATION_STATUS_ACTION = '[google] Authorization Status';
export const GET_AUTHORIZATION_STATUS_ACTION = '[google] get Status'

export const getAuthorizationStatus = createAction(GET_AUTHORIZATION_STATUS_ACTION,props<{username:string}>())
export const updateAuthorizationStatus = createAction(AUTHORIZATION_STATUS_ACTION,props<{authorizationStatus:boolean}>())



