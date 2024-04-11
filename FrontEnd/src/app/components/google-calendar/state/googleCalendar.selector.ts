import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authorizationStatus } from "../../../Models/googleCalendarModels";
import { googleSigningInState, } from "./googleCalender.state";


export const Authorization_STATE_NAME='Google Authorization';
export const GOOGLE_SIGNING_IN_STATE_NAME = 'Google Sign In'


const AuthorizationState=createFeatureSelector<authorizationStatus>(Authorization_STATE_NAME);
const SigningInState=createFeatureSelector<googleSigningInState>( GOOGLE_SIGNING_IN_STATE_NAME);

export const getAuthorizationState = createSelector(AuthorizationState,state=>{
    return state.authorizationStatus
})

export const getGoogleSigningInState = createSelector(SigningInState,state=>{
    return state.signingInStatus;
})