import { Action, createReducer, on } from "@ngrx/store";
import { gptState, initialGptState, initialResponseErrorState } from "./gpt.state";
import { ReponseError, clearGptResponse, sendPrompt, storeGptResponse } from "./gpt.action";
import { LogOut } from "../../shared/state/shared.action";

const _gptReducer = createReducer(initialGptState,on(storeGptResponse,(state,action)=>{

    // console.log(action.response);

    return{
        ...state,gptResponse: action.response
    }
    
}),on(clearGptResponse,(state,action)=>{

    return {...initialGptState}
 }),
on(LogOut,(state,action)=>{

    return {...initialGptState}
 })
)

const _gptReponseErrorReducer = createReducer(initialResponseErrorState,on(ReponseError,(state,action)=>
{
    return {
        ...state,error:action.error
    }
}), on(LogOut,(state,action)=>{
    return{...initialResponseErrorState}
})

)

export function gptReducer(state:any, action:any)
{
    return _gptReducer(state,action)
}

export function gptResponseErrorReducer(state:any, action:any)
{
    return _gptReponseErrorReducer(state,action)
}