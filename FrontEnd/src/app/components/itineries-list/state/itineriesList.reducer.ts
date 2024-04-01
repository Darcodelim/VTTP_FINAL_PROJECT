import { createReducer, on } from "@ngrx/store";
import { initialItineriesListState } from "./itineriesList.state";
import { addItineriesList} from "./itineriesList.action";
import { LogOut } from "../../shared/state/shared.action";

const _itineriesListReducer= createReducer(initialItineriesListState,on(addItineriesList,(state,action)=>{

    return {...state, itineries:action.itineriesList}
    
}),on(LogOut,(state,action)=>{

    return {...initialItineriesListState}
 })


)

export function itineraryListReducer(state:any,action:any)
{
    return _itineriesListReducer(state,action);
}

