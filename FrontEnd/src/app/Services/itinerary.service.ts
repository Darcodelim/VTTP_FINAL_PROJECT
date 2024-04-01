import { Injectable, inject } from '@angular/core';
import { GPTResponse } from '../Models/gptModels';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';
import { itineraryInfo } from '../Models/ItineraryInfoModel';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private http=inject(HttpClient); 
  
  //Error Handling
  private handleError(error: HttpErrorResponse) {
  
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error.error);
    
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('An error had occured while trying to generate a response from the server'));
  }

  getGptResponse(prompt:string):Observable<GPTResponse>
  {
    let param = new HttpParams();
    param = param.set('prompt',prompt)
    return this.http.get<GPTResponse>('api/GPT/insertPrompt',{params:param})
    .pipe(
      catchError((err)=> 
      this.handleError(err)
      )
    );
  }

  insertItinerary(username:string, itineraryTitle:string,startDate:string,endDate:string,itinerary:GPTResponse):Observable<string>
  {
    console.log(username)
    console.log(itineraryTitle)
    console.log(itinerary.Country)
    let param = new HttpParams();
    param = param.set('username',username).set('title',itineraryTitle).set('startDate',startDate).set('endDate',endDate);

    return this.http.post<string>('api/insertItinerary',itinerary,{params:param})
    
  }

  getItineraryList(email:string)
  {
    let param= new HttpParams();

    param = param.set('email',email);

    return this.http.get<itineraryInfo[]>('api/getItineraryInfo',{params:param})

  }

  getItinerary(itineraryID:string)
  {


    return this.http.get<GPTResponse>(`api/getItinerary/${itineraryID}`)

  }


  deleteItinerary(itineraryID:string)
  {

    return this.http.delete<string>(`api/deleteItinerary/${itineraryID}`)

  }

  editItineraryTitle(itineraryID: string, title: string)
  {
    const requestBody = {title:title};

    return this.http.patch(`api/editItineraryTitle/${itineraryID}`,requestBody)
  }






}
