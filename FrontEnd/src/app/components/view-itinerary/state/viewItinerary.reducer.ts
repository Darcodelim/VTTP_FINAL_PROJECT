import { Action, createReducer, on } from "@ngrx/store";

import { LogOut } from "../../shared/state/shared.action";
import { initialviewItineraryState } from "./viewItinerary.state";
import { clearMongoResponse, storeMongoResponse } from "./viewItinerary.action";

const _mongoItineraryReducer = createReducer(initialviewItineraryState,on(storeMongoResponse,(state,action)=>{

    // console.log(action.response);

    return{
        ...state,
        mongoReponse: action.mongoReponse,
        itineraryID: action.itineraryID
    }
    
}),on(clearMongoResponse,(state,action)=>{

    return {...initialviewItineraryState}
 }),
on(LogOut,(state,action)=>{

    return {...initialviewItineraryState}
 })
)

export function mongoItineraryReducer(state:any, action:any)
{
    return _mongoItineraryReducer(state,action)
}