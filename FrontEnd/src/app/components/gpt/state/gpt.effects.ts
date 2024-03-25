import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ItineraryService } from "../../../Services/itinerary.service";
import { ReponseError, gptReponseError, sendPrompt, storeGptResponse } from "./gpt.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class GptEffects{

    constructor(private actions$:Actions, private itinerarySvc:ItineraryService)
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

                            return storeGptResponse({response:gptResponse})

                        }),catchError(()=> of(ReponseError())
                        
                        )
                    )
                }))
        }

    )

}