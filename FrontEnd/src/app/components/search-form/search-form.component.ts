import { Component, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Country } from '../../Models/countryModels';
import { Observable, map } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {

    private countrySvc = inject(CountryService)

    countriesOb$!:Observable<Country[]>
    
    //Countries Variable
    countries!:Country[]
    countryOnly!:String[]
    filteredCountry!:String[]

    //Region Variable
   selectedRegion!:String[]

    formGroup!: FormGroup;

    private fb = inject(FormBuilder)

    constructor()
    { //Countries Observable to be shared
      this.countriesOb$ = this.countrySvc.getCountryRegiongCities()
      
      this.getCountry();
      this.initForm();
    }

    getCountry()
    {
      this.countriesOb$.pipe(map(country=>country.map(c=>c['country'])))
      .subscribe(country=>
        {
          //Have to include this option as it is read by the filterData side
          this.countryOnly = country

          //This is included as it would all of the countries in the begining before there is any filtering
          this.filteredCountry = country
          // console.log(this.filteredCountry);
        }
        )
    }

    getRegion(selectedCountry:string):Observable<string []>
    {
      return this.countriesOb$.pipe(map(countries =>
        {
          const selectedCountryData = countries.find(country=>country.country===selectedCountry);

          if(selectedCountryData)
          {
            return selectedCountryData.regions.map(region=>region.region)
          }
          else{
            return []
          }
        }))


    }


    //FORM Area
    private createCountryForm():FormGroup
    {
      return this.fb.group({
        country:this.fb.control<string>('',[Validators.required]),
        region:this.fb.control<string>('',[Validators.required]),
        municipal:this.fb.control<string>('',[Validators.required])
      })

    }

    initForm(){
      this.formGroup = this.createCountryForm();
      this.formGroup.get('country')?.valueChanges.subscribe(selectedCountry=>{
        console.log('data is:',selectedCountry)
        this.filterData(selectedCountry)
        
        this.getRegion(selectedCountry).subscribe(regions=>{
          
          this.selectedRegion = regions
          console.log(this.selectedRegion)
        }
         
          )
      })
    }


    //Data Filtering Area
    filterData(data:string)
    {
      //It filters the response that is added in to produce the country that match the response
        this.filteredCountry = this.countryOnly.filter(country=>{
          return country.toLowerCase().indexOf(data.toLowerCase())>-1
        })
    }

}
