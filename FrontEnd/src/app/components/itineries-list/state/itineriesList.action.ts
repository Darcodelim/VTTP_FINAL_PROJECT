import { createAction, props } from "@ngrx/store"
import { itineraryInfo } from "../../../Models/ItineraryInfoModel"


export const RETREIVE_ITINERIESLIST_ACTION = '[itineries list] retreive list'

export const ADD_ITINERIESLIST_ACTION = '[itineries list] add list'

export const DELETE_ITINERARY_ACTION = '[itineries list] delete itinerary'



export const retrieveItineriesList = createAction(RETREIVE_ITINERIESLIST_ACTION,props<{email:string}>())

export const addItineriesList = createAction(ADD_ITINERIESLIST_ACTION,props<{itineriesList:itineraryInfo[]}>())

export const deleteItinerary = createAction(DELETE_ITINERARY_ACTION,props<{itineraryID:string,email:string}>())