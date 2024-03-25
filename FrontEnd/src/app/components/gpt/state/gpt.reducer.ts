import { Action, createReducer, on } from "@ngrx/store";
import { gptState, initialGptState } from "./gpt.state";
import { sendPrompt, storeGptResponse } from "./gpt.action";

const _gptReducer = createReducer(initialGptState,on(storeGptResponse,(state,action)=>{

    // console.log(action.response);

    return{
        ...state,gptResponse: action.response
    }
    
}))

export function gptReducer(state:any, action:any)
{
    return _gptReducer(state,action)
}