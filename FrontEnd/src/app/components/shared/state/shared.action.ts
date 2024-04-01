import { createAction, props } from "@ngrx/store"


export const SET_LOADING_ACTION = "[shared state] set loading spinner"
export const LOG_OUT_ACTION ="LOGOUT"

export  const setLoadingSpinner = createAction(SET_LOADING_ACTION,props<{status:boolean}>())
export  const LogOut= createAction(LOG_OUT_ACTION)