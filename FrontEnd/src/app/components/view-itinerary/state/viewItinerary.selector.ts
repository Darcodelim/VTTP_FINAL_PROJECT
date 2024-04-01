import { createFeatureSelector, createSelector } from "@ngrx/store"
import { viewItineraryState } from "./viewItinerary.state"

export const VIEW_ITINERARY_STATE_NAME = "VIEW_ITINERARY"

//creating feature name
const selectMongoItineraryState = createFeatureSelector<viewItineraryState>(VIEW_ITINERARY_STATE_NAME);

export const getMongoResponse = createSelector(selectMongoItineraryState,state=>{
    return state.mongoReponse
})

export const getItineraryID = createSelector(selectMongoItineraryState,state=>{
    return state.itineraryID
})