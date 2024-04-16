import { ChangeDetectorRef, Component, NgZone, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import { CountryService } from '../../Services/country.service';
import { Country, formCountry } from '../../Models/countryModels';
import { Observable, Subscription, debounceTime, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getCountryAction, storeCountryFormAction, storeCountryResponse } from './state/country.action';
import { getCountryResponse } from './state/country.selector';
import { Router } from '@angular/router';
import { getLoading } from '../shared/state/shared.selector';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent implements OnDestroy {

  

    countriesOb$!:Observable<Country[]|null>
    countriesSub!:Subscription

    
    //Countries Variable
    countries!:Country[]|null
    countryOnly!:String[]|null
    filteredCountry!:String[]|undefined
    country!:String

    //Region Variable
   selectedRegion!:String[]
   filteredRegion!:String[]
   region!:String

   //City/Municipal Variable
   selectedCity!:String[]
   filteredCity!:String[]

   formGroup!: FormGroup;

   //CheckBox
   includeCityMunicipal:boolean = false;
   isCityMunicipalSameAsRegionVariable:boolean = false;
   checkboxStatus:boolean = false;

   //Min Date, prevents user to pick past dates
   minDate!:Date;

    private fb = inject(FormBuilder)

    constructor(private store:Store<AppState>,private router:Router)
    { //Countries Observable to be shared from store
      this.loadDataIfDoesntExists();
      
      // this.getCountry();
      this.getCountry();
      this.initForm();

      //setMinDate
      this.setMinDate()

      // this.isCityMunicipalSameAsRegion();


    }
  ngOnDestroy(): void {
    //must unsubscribe, it would cause multiple emission on other subscription in other components
    this.countriesSub.unsubscribe();
  }

  setMinDate()
  {
    const currentDate = new Date()
    this.minDate = currentDate
  }


    getCountry()
    {
      this.countriesOb$.pipe(map(country=>country?.map(c=>c['country'])))
      .subscribe(country=>
        {
          if(country){
          //Have to include this option as it is read by the filterData side
          this.countryOnly = country
           //This is included as it would all of the countries in the begining before there is any filtering
          this.filteredCountry = country
            // console.log(this.filteredCountry);
          }
        }
        )
    }

    getRegion(selectedCountry:string):Observable<string []>
    {
      return this.countriesOb$.pipe(map(countries =>
        {
          const selectedCountryData = countries?.find(country=>country.country===selectedCountry);
          console.log("Calling API")
          if(selectedCountryData)
          {
            return selectedCountryData.regions.map(region=>region.region)
          }
          else{
            return []
          }
        }))


    }

    getCity(selectedCountry:String,selectedRegion:String):Observable<string []>
    {
      return this.countriesOb$.pipe(map(countries =>
        { 
          console.log("Calling API City")
          const selectedCountryData = countries?.find(country=>country.country===selectedCountry);
          if(selectedCountryData)
          {
             const selectedRegionData = selectedCountryData.regions.find(region=>region.region===selectedRegion)
             if(selectedRegionData)
             {
                return selectedRegionData?.municipalities.map(municipal=>municipal.municipal)
             }
             else
             {
                return []
             }
             
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
        startDate:this.fb.control<string>('',[Validators.required]),
        endDate:this.fb.control<string>('',[Validators.required]),
        country:this.fb.control<string>('',[Validators.required]),
        region:this.fb.control<string>('',[Validators.required]),
        municipal:this.fb.control<string>('',[])
      })

    }

    onSubmit()
    {
      const countryform:formCountry =  this.formGroup.value
      // console.log(countryform);

      console.log(countryform.startDate);

      this.store.dispatch(storeCountryFormAction({countryFormData:countryform}))
      
      this.router.navigate(['/itinerary'])

 
    }

    initForm(){
      

      this.formGroup = this.createCountryForm();


      this.formGroup.get('country')?.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe(selectedCountry=>{
        console.log('data is:',selectedCountry)
        this.filterCountry(selectedCountry)
        
        this.country = selectedCountry;

        console.log("Country Selected:",this.country)
        // Region
        this.getRegion(selectedCountry).subscribe(regions=>{
        this.selectedRegion = regions
        this.filteredRegion = regions
        

        console.log(this.selectedRegion)
        }
          )
      })

      this.formGroup.get('region')?.valueChanges.pipe(debounceTime(500),distinctUntilChanged()).subscribe(selectedRegion=>{
          this.filterRegion(selectedRegion)
          this.region=selectedRegion
          console.log("Region Selected:",this.region)
          
          this.getCity(this.country,this.region).subscribe(cities=>{
        
            this.selectedCity = cities
            this.filteredCity = cities

            //Checking 
            this.isCityMunicipalSameAsRegionVariable = this.isCityMunicipalSameAsRegion(this.region,cities)

            if(this.isCityMunicipalSameAsRegionVariable)
              { 
                this.includeCityMunicipal=false
                this.resetMunicipalValidators();
              }

            

        
      })

      this.formGroup.get('municipal')?.valueChanges.subscribe(selectedCity=>
        {
          this.filterCity(selectedCity);
        })
      
      })
    }

    resetMunicipalValidators(){

      const municipalControl = this.formGroup.get('municipal')

   
      
        municipalControl?.setValue('');
        municipalControl?.clearValidators()
      

      municipalControl?.updateValueAndValidity();
      
    }

    toggleCityMunicipal(checked:boolean)
    {
      this.includeCityMunicipal = checked;
      const municipalControl = this.formGroup.get('municipal')

      if(checked)
      {
        municipalControl?.setValidators([Validators.required])
      }

      else
      {
        municipalControl?.setValue('');
        municipalControl?.clearValidators()
      }

      municipalControl?.updateValueAndValidity();


    }



    //Data Filtering Area
    filterRegion(region:string)
    {
      this.filteredRegion = this.selectedRegion.filter(Region=>{
        return Region.toLowerCase().indexOf(region.toLowerCase())>-1
      })
    }

    
    filterCountry(Country:string)
    {
      //It filters the response that is added in to produce the country that match the response

      
        this.filteredCountry = this.countryOnly?.filter(country=>{
          return country.toLowerCase().indexOf(Country.toLowerCase())>-1
        })
    }

    filterCity(city:String)
    {
      this.filteredCity = this.selectedCity.filter(City=>
        {
          return City.toLowerCase().indexOf(city.toLowerCase())>-1
        })
    }

    isCityMunicipalSameAsRegion(region:String,cities:string[]):boolean{
      return cities.length === 1 && region === cities[0]
     
    }

    loadDataIfDoesntExists()
    { //fetches the data from backend, and store it once and use for every subscription
     this.countriesSub = this.store.pipe(select(getCountryResponse)).subscribe((data)=>{
        if(!data)
        {
          this.store.dispatch(getCountryAction())
          this.countriesOb$ = this.store.select(getCountryResponse)
          
        }

        else{
          this.countriesOb$ = this.store.select(getCountryResponse)
        }
      })
    }

}
