import { createAction, props } from "@ngrx/store"
import { Country, formCountry } from "../../../Models/countryModels"

//get All Country Info Actions names
export const getCountry ='get Country from API'
export const countryResponseSuccess = 'country response successfully'
export const countryReponseError = 'country response received unsuccessfully'

//Country Form Actions names
export const storeCountryForm = 'store Country Form'

export const getCountryAction= createAction(getCountry)
//I want to store the gptReponse with this action
export const storeCountryResponse= createAction(countryResponseSuccess,props<{response:Country[]}>())
export const ReponseError=createAction(countryReponseError)

export const storeCountryFormAction = createAction(storeCountryForm,props<{countryFormData:formCountry}>())