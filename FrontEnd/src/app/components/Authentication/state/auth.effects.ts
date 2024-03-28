import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loginStart, loginSuccess } from "./auth.actions";
import { catchError, exhaustMap, map, of, tap } from "rxjs";


import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AppState } from "../../../store/app.state";
import { AuthService } from "../../../Services/auth.service";

@Injectable()
export class AuthEffects {
    constructor(private actions$:Actions, private authService:AuthService, private store: Store<AppState>, private router:Router)
    {
 
    }


    //https://stackoverflow.com/questions/45490368/ngrx-oftype-ngrx-effects
//     login$ = createEffect(():any =>{
//         return this.actions$.pipe(ofType(loginStart),
//         exhaustMap((action)=> {
//             return this.authService.login(action.email,action.password)
//             .pipe(map((data) =>
//             {   
//                 // this.store.dispatch(setLoadingSpinner({status:false})) //false to remove the loading spinner
//                 const user = this.authService.formatUser(data);
//                 return loginSuccess({user});
//             }),
//             catchError((errResp) => {
//                 console.log(errResp.error.error.message);
//                 this.store.dispatch(setLoadingSpinner({status:false}))
//                 const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
//                 return of(setErrorMessage({message:errorMessage}));
//             })
            
            
//             )

//     }))
// })

// Dispatch is false as you do not want to dispatch the action automatically to change the state, in this case there is no chnange of state but a rerouting of a new navigation
// loginRedirect$ = createEffect(()=>{return this.actions$.pipe(ofType(loginSuccess),tap((action)=>{this.router.navigate(['/'])}))},{dispatch:false})

}
                
