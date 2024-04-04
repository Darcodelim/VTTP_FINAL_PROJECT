import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authorizationStatus } from "../../../Models/googleCalendarModels";


export const Authorization_STATE_NAME='Google Authorization';
const AuthorizationState=createFeatureSelector<authorizationStatus>(Authorization_STATE_NAME);


export const getAuthorizationState = createSelector(AuthorizationState,state=>{
    return state.authorizationStatus
})