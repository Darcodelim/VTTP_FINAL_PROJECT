import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable, catchError, tap } from "rxjs";
import { User } from "../Models/User";
import { LoginState } from "../components/Authentication/state/auth.state";
import { authorizationLink, authorizationStatus, eventFormFormat, revokeStatus } from "../Models/googleCalendarModels";
import { environment } from "../../environments/environment";

const URL = environment.url


@Injectable({
    providedIn: 'root'
  })
  export class googleCalendarService
  {
      private http = inject(HttpClient)


      getAuthorizationLink():Observable<authorizationLink>
      {
        return this.http.get<authorizationLink>(`${URL}/api/oauth2/authorize`)
      }

      verifyAuthorization(username:string):Observable<authorizationStatus>
      {
        let param= new HttpParams();

        param = param.set('username',username);

        return this.http.get<authorizationStatus>(`${URL}/api/oauth2/verify`,{params:param})
      }

    //   login(user:User):Observable<LoginState>
    //   {
    //     return this.http.post<LoginState>('/api/validateUser',user)
    //     // .pipe(catchError((err)=>{
    //     // console.log(err.error.Error)
    //     // throw err.error.Error }))
    //   }

    setCalendarEvent(eventForm:eventFormFormat)
    {
      let param = new HttpParams();
      param = param.set('title',eventForm.title).set('startDate',eventForm.startDate.toLocaleDateString('es-CL')).set('endDate',eventForm.endDate.toLocaleDateString('es-CL'));
      return this.http.get<string>(`${URL}/api/insertCalendarEvent`,{params:param})
    }

    revokeToken()
    {
      return this.http.get<revokeStatus>(`${URL}/api/oauth2/revokeToken`);
    }


  }

