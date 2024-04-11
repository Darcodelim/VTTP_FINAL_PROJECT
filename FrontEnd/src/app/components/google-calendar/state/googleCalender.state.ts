import { authorizationStatus } from "../../../Models/googleCalendarModels";

export const initialAuthorizationState:authorizationStatus={
    authorizationStatus:false
}



export  interface googleSigningInState{

    signingInStatus:boolean
}

export const initialSiginingInState:googleSigningInState=
{
    signingInStatus:false
}

    
