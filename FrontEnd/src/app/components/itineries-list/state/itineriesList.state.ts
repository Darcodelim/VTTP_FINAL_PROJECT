import { itineraryInfo } from "../../../Models/ItineraryInfoModel";

export interface itineriesListState{
    itineries:itineraryInfo[]|null

}

export const initialItineriesListState:itineriesListState =
{
    itineries:null
}