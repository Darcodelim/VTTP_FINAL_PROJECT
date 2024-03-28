import { Country, formCountry } from "../../../Models/countryModels"

export interface countryState
{
    countryResponse:Country[]|null
}

export const initialCountryState:countryState=
{
    countryResponse:null
}

export interface countryFormState
{
    countryFormData:formCountry|null
}

export const initialFormCountryState:countryFormState=
{
    countryFormData:null
}