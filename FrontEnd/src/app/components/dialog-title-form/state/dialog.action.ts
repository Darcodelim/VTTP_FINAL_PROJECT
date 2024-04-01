import { createAction, props } from "@ngrx/store"

export const ADD_TITLE= 'Adding Itinerary Title'



//I want to send a string prompt into this action
export const addTitle= createAction(ADD_TITLE,props<{title:string}>())
//I want to store the gptReponse with this action
