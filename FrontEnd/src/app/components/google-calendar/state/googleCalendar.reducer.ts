import { createReducer, on } from "@ngrx/store";
import { initialAuthorizationState, initialSiginingInState } from "./googleCalender.state";
import {  updateAuthorizationStatus, updateGoogleSigningInStatus,  } from "./googleCalender.action";
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


const _googleSigningInReducer = createReducer(initialSiginingInState,on(updateGoogleSigningInStatus,(state,action)=>{

    return{

        ...state,
        signingInStatus:action.signingInStatus
    }

}),on(LogOut,(state,action)=>{
    return{...initialSiginingInState}
})


)

export function googleSigningInReducer (state:any,action:any)
{
    return _googleSigningInReducer(state,action)
}

export function AuthorizationReducer(state:any,action:any)
{return _AuthorizationReducer(state,action)

}
