import { createFeatureSelector, createSelector } from "@ngrx/store";
import { itineraryAddCalendarState, itineriesListState } from "./itineriesList.state";

export const ITINERIES_LIST_STATE_NAME = 'Itineries List State'
export const ITINERARY_ADD_CALENDAR_STATE_NAME = 'Itinerary Add Calendar State'

const getItineriesListState  = createFeatureSelector<itineriesListState>(ITINERIES_LIST_STATE_NAME);

const getItineraryAddCalendarState =  createFeatureSelector<itineraryAddCalendarState>(ITINERARY_ADD_CALENDAR_STATE_NAME);

export const getItineriesList = createSelector(getItineriesListState,state=>{
    return state.itineries
})

export const getItineraryAddCalendar = createSelector(getItineraryAddCalendarState,state=>{
    return state
})