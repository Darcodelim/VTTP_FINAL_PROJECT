import { createFeatureSelector, createSelector } from "@ngrx/store";
import { itineriesListState } from "./itineriesList.state";

export const ITINERIES_LIST_STATE_NAME = 'Itineries List State'

const getItineriesListState  = createFeatureSelector<itineriesListState>(ITINERIES_LIST_STATE_NAME);

export const getItineriesList = createSelector(getItineriesListState,state=>{
    return state.itineries
})