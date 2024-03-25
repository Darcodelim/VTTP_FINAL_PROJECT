import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Country } from "../Models/countryModels";

@Injectable({
    providedIn: 'root'
  })

export class CountryService
{
    private http=inject(HttpClient); 

    
    getCountryRegiongCities():Observable<Country[]>
    {
      return this.http.get<Country[]>('api/getAll')
  
    }

}