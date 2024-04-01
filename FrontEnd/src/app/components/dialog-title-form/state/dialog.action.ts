import { createAction, props } from "@ngrx/store"

export const ADD_TITLE= 'Adding Itinerary Title'

export const CLEAR_TITLE= "Clear Itinerary Title"




export const addTitle= createAction(ADD_TITLE,props<{title:string}>())

export const clearTitle=createAction(CLEAR_TITLE)
