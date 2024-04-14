import { itineraryInfo } from "../../../Models/ItineraryInfoModel";

export interface itineriesListState{
    itineries:itineraryInfo[]|null

}

export interface itineraryAddCalendarState{
    title:string
    startDate:string
    endDate:string

}

export const initialItineriesListState:itineriesListState =
{
    itineries:null
}

export const initialItineraryAddCalendarState:itineraryAddCalendarState =
{
    title:"",
    startDate:"",
    endDate:""
}