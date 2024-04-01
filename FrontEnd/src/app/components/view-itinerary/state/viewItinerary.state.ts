import { GPTResponse } from "../../../Models/gptModels";

export interface viewItineraryState
{
    mongoReponse:GPTResponse|null
    itineraryID:string
}

export const initialviewItineraryState:viewItineraryState=
{
    mongoReponse:null,
    itineraryID:""
}