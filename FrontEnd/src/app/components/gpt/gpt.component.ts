import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ItineraryService } from '../../Services/itinerary.service';
import { GPTResponse } from '../../Models/gptModels';
import { EMPTY, Observable, Subscription, mergeMap, of, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { sendPrompt } from './state/gpt.action';
import { getGptResponse } from './state/gpt.selector';
import { formCountry } from '../../Models/countryModels';
import { getFormData } from '../search-form/state/country.selector';
import { setLoadingSpinner } from '../shared/state/shared.action';
import { getLoading } from '../shared/state/shared.selector';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrl: './gpt.component.css'
})
export class GPTComponent implements OnInit,OnDestroy {

  private itinerarySvc=inject(ItineraryService)

  GPTresponse$!:Observable<GPTResponse|null>

  countryForm$!:Observable<formCountry|null>

  
    //Loading spinner
    showLoading$!:Observable<boolean>;

  countryFormSub!:Subscription
  prompts:string ="";

  startDate!:Date
  endDate!:Date
  country!:String
  region!:String
  municipal!:String

  

  days!:String

  constructor(private store:Store<AppState>)
  {
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.showLoading$ = this.store.select(getLoading)
    // this.GPTresponse$=this.itinerarySvc.getGptResponse(this.prompts)
    this.countryForm$ = this.store.select(getFormData)
    //As a safety precaution, I use take(1) just in case there are observables that didnt unsubscribe
   this.countryFormSub= this.countryForm$.pipe(take(1)).subscribe(formData=>
      {
        if(formData)
        {
          this.startDate = formData?.startDate //Using MatNativeDateModule
          this.endDate = formData?.endDate
          this.country = formData?.country
          this.region = formData?.region
          this.municipal = formData?.municipal
  
          this.days =this.calculateDays(this.startDate,this.endDate )
          const startDateWithFormat = this.startDate?.toLocaleDateString('en-GB') //ddmmyyyy
          const endDateWithFormat = this.endDate?.toLocaleDateString('en-GB')

          let prompt:string;
          if(this.municipal.length>1)
          {
            prompt = `create a ${this.days} day itinerary for ${this.country},${this.region},${this.municipal} from ${startDateWithFormat}-${endDateWithFormat}`
          }

          else
          {
            prompt = `create a ${this.days} day itinerary for ${this.country},${this.region} from ${startDateWithFormat}-${endDateWithFormat}`
          }
          this.prompts=prompt;
          console.log(this.prompts)
          }
          
    
      })
        
        
      

  }
  ngOnDestroy(): void {
    //Must unsubscribe here as well, if not the memory would lead to multiple emissions during navigation in other components
    this.countryFormSub.unsubscribe();
  }

  ngOnInit(): void {

      if(this.prompts.length>1)
      {
        this.store.dispatch(sendPrompt({prompt:this.prompts}))
        this.GPTresponse$ = this.store.select(getGptResponse)
        this.showLoading$ =this.store.select(getLoading)
      }

  }

  calculateDays(startDate:Date|undefined,endDate:Date|undefined):String
  {
    //https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-typescript/
   
    // Calculate the difference in 
    // milliseconds between the two dates
    if(startDate!==undefined && endDate!==undefined)
    { 
    const differenceInMs: number = Math.abs(endDate.getTime() - startDate.getTime());

    // Define the number of milliseconds in a day
    const millisecondsInDay: number = 1000 * 60 * 60 * 24;

    // Calculate the difference in days by 
    // dividing the difference in milliseconds by 
    // milliseconds in a day
    // this is including the day of the start date itself
    const differenceInDays: number = Math.floor((differenceInMs + millisecondsInDay) / millisecondsInDay);

    // Output the result
    console.log(
      'Number of days between the two dates:', differenceInDays);

    return differenceInDays.toString()


    }

    else{

      return " "
    }
    

    }
  


  }





