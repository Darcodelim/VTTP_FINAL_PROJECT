import { createReducer, on } from "@ngrx/store"
import { addTitle } from "./dialog.action"
import { initialDialogTitleState } from "./dialog.state"
import { LogOut } from "../../shared/state/shared.action"


const _dialogReducer = createReducer(initialDialogTitleState,on(addTitle,(state,action)=>{

    // console.log(action.response);

    return{
        ...state,title:action.title
    }
    
}),on(LogOut,(state,action)=>{

    return {...initialDialogTitleState}
 })
)



export function dialogReducer(state:any, action:any)
{
    return _dialogReducer(state,action)
}