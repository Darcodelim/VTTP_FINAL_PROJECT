import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { ItineraryService } from "../../../Services/itinerary.service"
import { map, mergeMap, tap } from "rxjs"
import { addItineriesList, deleteItinerary, retrieveItineriesList } from "./itineriesList.action"
import { AppState } from "../../../store/app.state"
import { Store } from "@ngrx/store"

@Injectable()
export class ItineriesListEffects{

    constructor(private actions$:Actions, private itinerarySvc:ItineraryService,private store:Store<AppState>)
    {

    }

    getItineriesList$ =  createEffect(
        ()=>{
            return this.actions$.pipe(ofType(retrieveItineriesList),mergeMap((action) =>
                {
                    return this.itinerarySvc.getItineraryList(action.email).pipe(
                        map((itineraryList)=>{
                            console.log(itineraryList)
                            // this.store.dispatch(setLoadingSpinner({status:false}))
    
                            return addItineriesList({itineriesList:itineraryList})
    
                        })
                    )
                }))
        }
    
    )
    deleteItinerary$ = createEffect(
        ()=>{
            return this.actions$.pipe(ofType(deleteItinerary),mergeMap((action)=>
            {
                return this.itinerarySvc.deleteItinerary(action.itineraryID).pipe(
                tap((status)=>{
                        console.log(status)
                        this.store.dispatch(retrieveItineriesList({email:action.email}))
                    }))
            }))
        }, {dispatch:false}
    )




}

