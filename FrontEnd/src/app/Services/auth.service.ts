import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, tap } from "rxjs";
import { User } from "../Models/User";
import { LoginState } from "../components/Authentication/state/auth.state";
import { environment } from "../../environments/environment";

const URL = environment.url

@Injectable({
    providedIn: 'root'
  })
  export class AuthService
  {
      private http = inject(HttpClient)


      signUp(user:User):Observable<LoginState>
      {
        return this.http.post<LoginState>(`${URL}/api/createUser`,user)
      }

      login(user:User):Observable<LoginState>
      {
        return this.http.post<LoginState>(`${URL}/api/validateUser`,user)
        // .pipe(catchError((err)=>{
        // console.log(err.error.Error)
        // throw err.error.Error }))
      }
  }

