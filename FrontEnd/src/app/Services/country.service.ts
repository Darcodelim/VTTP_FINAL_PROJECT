import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { Country } from "../Models/countryModels";
import { environment } from "../../environments/environment";


const URL = environment.url;


@Injectable({
    providedIn: 'root'
  })

export class CountryService
{
    private http=inject(HttpClient); 

    
    getCountryRegiongCities():Observable<Country[]>
    {
      return this.http.get<Country[]>(`${URL}/api/getAll`)
  
    }

}