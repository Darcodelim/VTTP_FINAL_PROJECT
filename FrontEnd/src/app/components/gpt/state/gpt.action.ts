import { createAction, props } from "@ngrx/store"
import { GPTResponse } from "../../../Models/gptModels"

export const SEND_PROMPT = 'Sending Prompt to GPT model'
export const gptReponseSuccess = 'Received GPT response successfully'
export const gptReponseError = 'Received GPT response unsuccessfully'


//I want to send a string prompt into this action
export const sendPrompt= createAction(SEND_PROMPT,props<{prompt:string}>())
//I want to store the gptReponse with this action
export const storeGptResponse= createAction(gptReponseSuccess,props<{response:GPTResponse}>())

export const ReponseError=createAction(gptReponseError)

