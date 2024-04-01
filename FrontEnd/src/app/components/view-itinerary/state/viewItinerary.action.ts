import { createAction, props } from "@ngrx/store"
import { GPTResponse } from "../../../Models/gptModels"

export const GET_MONGO_RESPONSE = 'Get Mongo Response'
export const mongoReponseSuccess = 'Received Itinerary from mongo successfully'
export const mongoReponseError = 'Received Itinerary from mongo  unsuccessfully'
export const CLEAR_MONGO_RESPONSE = 'Clear MONGO response'



export const EDIT_ITINERARY_TITLE='edit tinerary title '
export const  EDIT_ITINERARY_TITLE_SUCCESS='Itinerary title edited successfully'
export const  EDIT_ITINERARY_TITLE_UNSUCCESS='Itinerary title edited Unsuccessfully'



//I want to store the gptReponse with this action
export const getMongoResponseAction = createAction(GET_MONGO_RESPONSE,props<{title:string,itineraryID:string}>())
export const storeMongoResponse= createAction(mongoReponseSuccess,props<{mongoReponse:GPTResponse,itineraryID:string}>())
export const ReponseError=createAction(mongoReponseError)
export const clearMongoResponse = createAction(CLEAR_MONGO_RESPONSE);

//Itinerary
export const editItineraryTitle = createAction(EDIT_ITINERARY_TITLE,props<{itineraryID:string,title:string}>())
export const editItineraryTitleSuccess=createAction(EDIT_ITINERARY_TITLE_SUCCESS);
export const editItineraryTitleUnsuccess=createAction(EDIT_ITINERARY_TITLE_UNSUCCESS);
