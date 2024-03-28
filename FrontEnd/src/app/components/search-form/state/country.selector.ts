import { createFeatureSelector, createSelector } from "@ngrx/store";
import { countryFormState, countryState } from "./country.state";

export const COUNTRY_STATE_NAME = "Country"
export const COUNTRY_FORM_STATE_NAME = "Country Form"

//creating feature name
const selectCountryState = createFeatureSelector<countryState>(COUNTRY_STATE_NAME);
const selectFormState =  createFeatureSelector<countryFormState>(COUNTRY_FORM_STATE_NAME);

export const getCountryResponse = createSelector(selectCountryState,state=>{
    return state.countryResponse
})

export const getFormData = createSelector(selectFormState,state=>
    {  
        return state.countryFormData
    })