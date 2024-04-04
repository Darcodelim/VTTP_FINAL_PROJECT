import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { googleCalendarService } from "../../../Services/googleCalendar.service"
import { Store, select } from "@ngrx/store"
import { AppState } from "../../../store/app.state"
import { Router } from "@angular/router"
import { catchError, exhaustMap, interval, map, of, take, takeWhile, tap, withLatestFrom } from "rxjs"
import { getAuthorizationStatus, updateAuthorizationStatus } from "./googleCalender.action"
import { getAuthorizationState } from "./googleCalendar.selector"
import { LogOut } from "../../shared/state/shared.action"


@Injectable()
export class googleAuthEffects {


    
constructor(private actions$:Actions, private googleCalSvc:googleCalendarService, private store: Store<AppState>, private router:Router)
{

}


getAuthorization$ = createEffect(():any =>{

    return this.actions$.pipe(ofType(getAuthorizationStatus),withLatestFrom(this.store.pipe(select(getAuthorizationState))),
    exhaustMap(([action,verify])=>{
        const username = action.username;
        return interval(5000).pipe(
            takeWhile(() => !verify), // use the value from the store
            exhaustMap(() =>
              this.googleCalSvc.verifyAuthorization(username).pipe(
                map(response => {
                  // Dispatch action to update authorization status in the store
                  return updateAuthorizationStatus({ authorizationStatus: response.authorizationStatus });
                }),
                catchError((error)=>{

                    console.log(error)

                    return of(updateAuthorizationStatus({authorizationStatus:false}))
                }),
            
            
                )
                
                
                ),take(3)
                
                )

    })
    
    )
   
})

 
logOut$ = createEffect(
    ()=>{
        return this.actions$.pipe(ofType(LogOut),exhaustMap(()=>
        {
            return this.googleCalSvc.revokeToken().pipe(
            tap((status)=>{
                    console.log(status)
                    
                }))
        }))
    }, {dispatch:false}
)
 }
 
