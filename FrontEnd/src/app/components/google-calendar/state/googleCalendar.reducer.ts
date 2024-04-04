import { createReducer, on } from "@ngrx/store";
import { initialAuthorizationState } from "./googleCalender.state";
import {  updateAuthorizationStatus } from "./googleCalender.action";
import { LogOut } from "../../shared/state/shared.action";

const _AuthorizationReducer= createReducer(initialAuthorizationState,on(updateAuthorizationStatus,(state,action)=>{

    console.log(action);

    return{
        ...state,
        authorizationStatus:action.authorizationStatus
    }
})
,on(LogOut,(state,action)=>{

    return {...initialAuthorizationState}
 })

);

export function AuthorizationReducer(state:any,action:any)
{return _AuthorizationReducer(state,action)

}
