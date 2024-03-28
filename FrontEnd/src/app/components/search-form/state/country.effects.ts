import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { CountryService } from "../../../Services/country.service"
import { getCountryAction, storeCountryFormAction, storeCountryResponse } from "./country.action"
import { map, mergeMap } from "rxjs"
import { Country } from "../../../Models/countryModels"

@Injectable()
export class countryEffects{

    constructor(private actions$:Actions, private countrySvc:CountryService)
    {

    }
    //I want to dispatch an action automatically to the state, thus dispatch is true as the effect returns an action
    loadReponse$ =  createEffect(
        ()=>{
            return this.actions$.pipe(ofType(getCountryAction),mergeMap(() =>
                {
                    return this.countrySvc.getCountryRegiongCities().pipe(map((country:Country[])=>{
                            console.log(country)

                            return storeCountryResponse({response:country})

                        }))
                }))
                
            }
    )

}
