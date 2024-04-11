import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { googleCalendarService } from "../../../Services/googleCalendar.service"
import { Store, select } from "@ngrx/store"
import { AppState } from "../../../store/app.state"
import { Router } from "@angular/router"
import { EMPTY, catchError, exhaustMap, filter, iif, interval, map, mergeMap, of, switchMap, take, takeWhile, tap, withLatestFrom } from "rxjs"
import { getAuthorizationStatus, updateAuthorizationStatus } from "./googleCalender.action"
import { getAuthorizationState } from "./googleCalendar.selector"
import { LogOut } from "../../shared/state/shared.action"


@Injectable()
export class googleAuthEffects {


    
constructor(private actions$:Actions, private googleCalSvc:googleCalendarService, private store: Store<AppState>, private router:Router)
{

}


 
// logOut$ = createEffect(
//     ()=>{
//         return this.actions$.pipe(ofType(LogOut),withLatestFrom(this.store.pipe(select(getAuthorizationState)) 
//         // https://stackoverflow.com/questions/73864052/angular-ngrx-state-update-synchronously
//         //Because of this fetching of data from the store, it has become async. thus the state changed first before when the effect is executed
//         ),tap(([action,verify])=>{console.log('Verify: ',verify)}),
//         mergeMap(([action,verify])=>iif(
//           ()=>(verify === true),
   
//              this.googleCalSvc.revokeToken().pipe(
//                 tap((status)=>{
//                         console.log(status)
//                     })
//                 ),of(console.log(verify))
//         )))
//     }, {dispatch:false}
// )
 }

 //Thus I have to do it manually at the navbar component

