import { createAction, props } from "@ngrx/store"
import { GPTResponse } from "../../../Models/gptModels"
import { createStateObservable } from "@ngrx/store-devtools/src/instrument"

export const SEND_PROMPT = 'Sending Prompt to GPT model'
export const gptReponseSuccess = 'Received GPT response successfully'
export const gptReponseError = 'Received GPT response unsuccessfully'
export const CLEAR_GPT_RESPONSE = 'Clear GPT response'

export const itineraryAddSuccess='Itinerary Added Successfully'
export const itineraryAddFail='Itinerary Added Unsuccessfully'

export const itineraryAdd ='Add Itinerary'

//I want to send a string prompt into this action
export const sendPrompt= createAction(SEND_PROMPT,props<{prompt:string}>())
//I want to store the gptReponse with this action
export const storeGptResponse= createAction(gptReponseSuccess,props<{response:GPTResponse}>())
export const ReponseError=createAction(gptReponseError)
export const clearGptResponse = createAction(CLEAR_GPT_RESPONSE);

//Itinerary
export const addItinerary = createAction(itineraryAdd,props<{username: string , title: string, startDate:string,endDate:string,response: GPTResponse}>())
export const addFailItinerary=createAction(itineraryAddFail);
export const addSuccessItinerary = createAction(itineraryAddSuccess);