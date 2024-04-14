import { createAction, props } from "@ngrx/store"
import { itineraryInfo } from "../../../Models/ItineraryInfoModel"


export const RETREIVE_ITINERIESLIST_ACTION = '[itineries list] retreive list'

export const ADD_ITINERIESLIST_ACTION = '[itineries list] add list'

export const DELETE_ITINERARY_ACTION = '[itineries list] delete itinerary'

export const ADD_ITINERARY_CALENDAR_ACTION ='[itineraries list] add itinerary to calendar'

export const RESET_ADD_ITINERARY_CALENDAR_ACTION= '[itineraries list] reset calendar state'


export const retrieveItineriesList = createAction(RETREIVE_ITINERIESLIST_ACTION,props<{email:string}>())

export const addItineriesList = createAction(ADD_ITINERIESLIST_ACTION,props<{itineriesList:itineraryInfo[]}>())

export const deleteItinerary = createAction(DELETE_ITINERARY_ACTION,props<{itineraryID:string,email:string}>())

export const addItineraryCalendar = createAction(ADD_ITINERARY_CALENDAR_ACTION,props<{itineraryTitle:string,startDate:string,endDate:string}>())

export const resetAddItineraryCalendar=createAction(RESET_ADD_ITINERARY_CALENDAR_ACTION);