import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ItineraryService } from "../../../Services/itinerary.service";
import { ReponseError, editItineraryTitle, editItineraryTitleSuccess, editItineraryTitleUnsuccess, getMongoResponseAction, storeMongoResponse, } from "./viewItinerary.action";
import { catchError, map, mergeMap, of } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.state";
import { setLoadingSpinner } from "../../shared/state/shared.action";
import { Router } from "@angular/router";
import { addTitle } from "../../dialog-title-form/state/dialog.action";

@Injectable()
export class viewItineraryEffects{

    constructor(private actions$:Actions, private itinerarySvc:ItineraryService,private store: Store<AppState>, private router:Router)
    {

    }
    //I want to dispatch an action automatically to the state, thus dispatch is true as the effect returns an action
    loadReponse$ =  createEffect(
        ()=>{
            return this.actions$.pipe(ofType(getMongoResponseAction),mergeMap((action) =>
                {
                    return this.itinerarySvc.getItinerary(action.itineraryID).pipe(
                        map((mongoResponseBackend)=>{
                            console.log(mongoResponseBackend)
                            this.router.navigate(['/viewItinerary'])
                            this.store.dispatch(setLoadingSpinner({status:false}))
                            this.store.dispatch(addTitle({title:action.title}));

                            return storeMongoResponse({mongoReponse:mongoResponseBackend,itineraryID:action.itineraryID})

                        }),catchError(()=> of(ReponseError())
                        
                        )
                    )
                }))
        }

    )

    addItinerary$ = createEffect(
        ()=>{
            return this.actions$.pipe(ofType(editItineraryTitle),mergeMap((action)=>
            {
                return this.itinerarySvc.editItineraryTitle(action.itineraryID,action.title).pipe(
                    map((statusReponse)=>
                {
                    console.log(statusReponse)

                    this.router.navigate(['/itineraryList'])
                    
                    return editItineraryTitleSuccess()

                }
                ,catchError((error)=>{
                    console.log(error)
                    return of(editItineraryTitleUnsuccess)

                })
                ))

            }))
        }
    )

}