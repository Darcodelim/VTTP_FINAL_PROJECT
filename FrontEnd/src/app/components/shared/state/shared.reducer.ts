import { createReducer, on } from "@ngrx/store";
import { setLoadingSpinner } from "./shared.action";
import { initialSharedState } from "./shared.state";


const _sharedReducer = createReducer(initialSharedState,on(setLoadingSpinner,(state,action)=>{

    return{
        ...state,showLoading:action.status
    }
    
}))

export function SharedReducer(state:any,action:any)
{
    return _sharedReducer(state,action);
}