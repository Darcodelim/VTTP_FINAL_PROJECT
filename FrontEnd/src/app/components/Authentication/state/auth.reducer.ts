import { createReducer, on } from "@ngrx/store";
import {  initialLoginState} from "./auth.state"
import { loginSuccess } from "./auth.actions";

const _loginReducer= createReducer(initialLoginState,on(loginSuccess,(state,action)=>{

    console.log(action);

    return{
        ...state,
        loginStatus:action.loginStatus
    }
}));

export function loginReducer(state:any,action:any)
{return _loginReducer(state,action)

}