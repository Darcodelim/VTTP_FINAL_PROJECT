import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginFail, loginStart, loginSuccess, signUpFail, signUpStart, signUpSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";


import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppState } from "../../../store/app.state";
import { AuthService } from "../../../Services/auth.service";
import { loginErrorState } from "./auth.state";

@Injectable()
export class AuthEffects {
    constructor(private actions$:Actions, private authService:AuthService, private store: Store<AppState>, private router:Router)
    {
 
    }

     // https://stackoverflow.com/questions/45490368/ngrx-oftype-ngrx-effects
     Login$ = createEffect(():any =>{
        return this.actions$.pipe(ofType(loginStart),
        exhaustMap((action)=> {
            return this.authService.login(action.user).pipe(map((data) =>
            {   
                // this.store.dispatch(setLoadingSpinner({status:false})) //false to remove the loading spinner
                const loginStatus = data.loginStatus
                const username = data.username
                //I put this because just incase if there is a login error previously, this will remove it 
                this.store.dispatch(loginFail({error:null}))
                return loginSuccess({loginStatus,username});
            }),
            catchError((errResp) => {
                console.log(errResp.error.Error)
                // this.store.dispatch(setLoadingSpinner({status:false}))
                const errorMessage = errResp.error.Error
                return of(loginFail({error:errorMessage}))
            })
            
            
            )

    }))
})



    // https://stackoverflow.com/questions/45490368/ngrx-oftype-ngrx-effects
    signUp$ = createEffect(():any =>{
        return this.actions$.pipe(ofType(signUpStart),
        exhaustMap((action)=> {
            return this.authService.signUp(action.user)
            .pipe(map((data) =>
            {   
                // this.store.dispatch(setLoadingSpinner({status:false})) //false to remove the loading spinner
                const loginStatus = data.loginStatus
                const username = data.username
                this.store.dispatch(signUpFail({error:null}))
                return signUpSuccess({loginStatus,username});
            }),
            catchError((errResp) => {
                console.log(errResp.error.Error);
                const errorMessage = errResp.error.Error
                
                return of(signUpFail({error:errorMessage}));
           
            })
            
            
            )

    }))
})

// Dispatch is false as you do not want to dispatch the action automatically to change the state, in this case there is no chnange of state but a rerouting of a new navigation
loginRedirect$ = createEffect(()=>{return this.actions$.pipe(ofType(signUpSuccess,loginSuccess),tap((action)=>{this.router.navigate(['search'])}))},{dispatch:false})

}
                
