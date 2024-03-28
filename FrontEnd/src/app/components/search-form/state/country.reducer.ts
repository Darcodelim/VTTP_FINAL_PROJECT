import { createReducer, on } from "@ngrx/store"
import { initialCountryState, initialFormCountryState } from "./country.state"
import {  storeCountryFormAction, storeCountryResponse } from "./country.action"



const _countryReducer = createReducer(initialCountryState,on(storeCountryResponse,(state,action)=>{

    // console.log(action.response);
    //The name of the variable to add from the action must be the same as what  we declared in "state.ts"
    return{
        ...state,countryResponse: action.response
    }
    
})
)

const _countryFormReducer = createReducer(initialFormCountryState,on(storeCountryFormAction,(state,action)=>
{
    
    return{
        ...state,countryFormData:action.countryFormData
    }
}))

export function countryReducer(state:any, action:any)
{
    return _countryReducer(state,action)
}

export function countryFormReducer(state:any, action:any)
{
    return _countryFormReducer(state,action)
}