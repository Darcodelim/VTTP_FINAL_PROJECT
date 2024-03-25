import { Injectable, inject } from '@angular/core';
import { GPTResponse } from '../Models/gptModels';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError, firstValueFrom, throwError } from 'rxjs';

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
    return this.http.get<GPTResponse>('api/GPT/insertPrompt',{params:param}).pipe(
      catchError((err)=> 
      this.handleError(err)
      )
    );
  }



}
