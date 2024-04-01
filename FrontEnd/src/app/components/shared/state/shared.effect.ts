import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {  tap } from "rxjs";


import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppState } from "../../../store/app.state";
import { LogOut } from "./shared.action";

@Injectable()
export class SharedEffects {
    constructor(private actions$:Actions, private store: Store<AppState>, private router:Router)
    {
 
    }

 
// Dispatch is false as you do not want to dispatch the action automatically to change the state, in this case there is no chnange of state but a rerouting of a new navigation
logOut$ = createEffect(()=>{return this.actions$.pipe(ofType(LogOut),tap((action)=>{this.router.navigate(['/'])}))},{dispatch:false})

}
                
