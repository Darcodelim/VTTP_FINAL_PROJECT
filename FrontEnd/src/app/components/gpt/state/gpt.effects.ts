import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ItineraryService } from "../../../Services/itinerary.service";
import { ReponseError, addFailItinerary, addItinerary, addSuccessItinerary, gptReponseError, itineraryAddSuccess, sendPrompt, storeGptResponse } from "./gpt.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { setLoadingSpinner } from "../../shared/state/shared.action";

@Injectable()
export class GptEffects{

    constructor(private actions$:Actions, private itinerarySvc:ItineraryService,private store: Store<AppState>)
    {

    }
    //I want to dispatch an action automatically to the state, thus dispatch is true as the effect returns an action
    loadReponse$ =  createEffect(
        ()=>{
            return this.actions$.pipe(ofType(sendPrompt),mergeMap((action) =>
                {
                    return this.itinerarySvc.getGptResponse(action.prompt).pipe(
                        map((gptResponse)=>{
                            console.log(gptResponse)
                            this.store.dispatch(setLoadingSpinner({status:false}))

                            return storeGptResponse({response:gptResponse})

                        }),catchError(()=> of(ReponseError())
                        
                        )
                    )
                }))
        }

    )

    addItinerary$ = createEffect(
        ()=>{
            return this.actions$.pipe(ofType(addItinerary),mergeMap((action)=>
            {
                return this.itinerarySvc.insertItinerary(action.username,action.title,action.startDate,action.endDate,action.response).pipe(map((statusReponse)=>
                {
                    console.log(statusReponse)
                    
                    return addSuccessItinerary()

                }
                ,catchError((error)=>{
                    console.log(error)
                    return of(addFailItinerary())

                })
                ))

            }))
        }
    )

}