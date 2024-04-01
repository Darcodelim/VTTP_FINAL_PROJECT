import { createReducer, on } from "@ngrx/store";
import {  initialLoginErrorState, initialLoginState} from "./auth.state"
import { loginFail, loginSuccess, signUpFail, signUpSuccess } from "./auth.actions";
import { LogOut } from "../../shared/state/shared.action";

const _loginReducer= createReducer(initialLoginState,on(loginSuccess,(state,action)=>{

    console.log(action);

    return{
        ...state,
        loginStatus:action.loginStatus,
        username:action.username
    }
}),on(signUpSuccess,(state,action)=>{
    return {
        ...state,
        loginStatus:action.loginStatus,
        username:action.username
    }
}),on(LogOut,(state,action)=>{

    return {...initialLoginState}
 })

);

const _errorReducer = createReducer(initialLoginErrorState, on(loginFail,(state,action)=>{

    return{...state,loginError:action.error}
}),

on(signUpFail,(state,action)=>{
    return{...state,loginError:action.error}
}),on(LogOut,(state,action)=>{

    return {...initialLoginErrorState}
 })
)

export function errorReducer(state:any,action:any)
{
    return _errorReducer(state,action)
}

export function loginReducer(state:any,action:any)
{return _loginReducer(state,action)

}