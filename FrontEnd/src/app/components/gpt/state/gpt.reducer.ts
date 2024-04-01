import { Action, createReducer, on } from "@ngrx/store";
import { gptState, initialGptState } from "./gpt.state";
import { sendPrompt, storeGptResponse } from "./gpt.action";
import { LogOut } from "../../shared/state/shared.action";

const _gptReducer = createReducer(initialGptState,on(storeGptResponse,(state,action)=>{

    // console.log(action.response);

    return{
        ...state,gptResponse: action.response
    }
    
}),on(LogOut,(state,action)=>{

    return {...initialGptState}
 })
)

export function gptReducer(state:any, action:any)
{
    return _gptReducer(state,action)
}