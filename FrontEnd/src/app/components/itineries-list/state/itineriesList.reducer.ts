import { createReducer, on } from "@ngrx/store";
import { initialItineraryAddCalendarState, initialItineriesListState } from "./itineriesList.state";
import { addItineraryCalendar, addItineriesList, resetAddItineraryCalendar} from "./itineriesList.action";
import { LogOut } from "../../shared/state/shared.action";

const _itineriesListReducer= createReducer(initialItineriesListState,on(addItineriesList,(state,action)=>{

    return {...state, itineries:action.itineriesList}
    
}),on(LogOut,(state,action)=>{

    return {...initialItineriesListState}
 })


)

const _itineraryCalendarReducer = createReducer(initialItineraryAddCalendarState,on(addItineraryCalendar,(state,action)=>{
    return{
        ...state,
        title:action.itineraryTitle,
        startDate:action.startDate,
        endDate:action.endDate

    }
}),on(LogOut,(state,action)=>{
    return{...initialItineraryAddCalendarState}
}),on(resetAddItineraryCalendar,(state,action)=>{
    return{...initialItineraryAddCalendarState}
})


)

export function itineraryCalendarReducer(state:any,action:any)
{
    return _itineraryCalendarReducer(state,action);
}

export function itineraryListReducer(state:any,action:any)
{
    return _itineriesListReducer(state,action);
}

