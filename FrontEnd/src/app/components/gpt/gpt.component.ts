import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ItineraryService } from '../../Services/itinerary.service';
import { GPTResponse } from '../../Models/gptModels';
import { EMPTY, Observable, Subscription, mergeMap, of, take, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addItinerary, clearGptResponse, sendPrompt } from './state/gpt.action';
import { getGptResponse } from './state/gpt.selector';
import { formCountry } from '../../Models/countryModels';
import { getFormData } from '../search-form/state/country.selector';
import { setLoadingSpinner } from '../shared/state/shared.action';
import { getLoading } from '../shared/state/shared.selector';
import { MatDialog } from '@angular/material/dialog';
import { DialogTitleFormComponent } from '../dialog-title-form/dialog-title-form.component';
import { getTitle } from '../dialog-title-form/state/dialog.selector';
import { DialogNoTitleComponent } from '../dialog-no-title/dialog-no-title.component';
import { LoginState } from '../Authentication/state/auth.state';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { clearTitle } from '../dialog-title-form/state/dialog.action';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrl: './gpt.component.css'
})
export class GPTComponent implements OnInit,OnDestroy {

  private itinerarySvc=inject(ItineraryService)

  //Observable
  GPTresponse$!:Observable<GPTResponse|null>
  countryForm$!:Observable<formCountry|null>
  title$!:Observable<string|null>
  loginState$!:Observable<LoginState>
  
  //Loading spinner
  showLoading$!:Observable<boolean>;

  //Subscriptions
  countryFormSub!:Subscription
  titleSub!:Subscription
  loginStateSub!:Subscription

  prompts!:string ;

  //Form variables
  startDate!:Date
  endDate!:Date
  country!:String
  region!:String
  municipal!:String

  

  days!:String
  Title!:string
  username!:string
  GPTResponse!:GPTResponse
  

  constructor(private store:Store<AppState>,public dialog: MatDialog)
  {
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.showLoading$ = this.store.select(getLoading)
    // this.GPTresponse$=this.itinerarySvc.getGptResponse(this.prompts)

    //CountryForm
    this.countryForm$ = this.store.select(getFormData)
    //Title
    this.title$=this.store.select(getTitle)
    this.titleSub =this.title$.subscribe((data)=>{
      if(data)
      {
        this.Title = data
      }
    }

   )

    //LoginState
    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    
    
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
          const startDateWithFormat = this.startDate?.toLocaleDateString('es-CL') //ddmmyyyy
          const endDateWithFormat = this.endDate?.toLocaleDateString('es-CL')

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
    //Clearing the states when leaving the page
    this.store.dispatch(clearTitle());
    this.store.dispatch(clearGptResponse());
    //Must unsubscribe here as well, if not the memory would lead to multiple emissions during navigation in other components
    this.countryFormSub.unsubscribe();
    this.titleSub.unsubscribe();
    this.loginStateSub.unsubscribe();

  }

  ngOnInit(): void {

      if(this.prompts.length>1)
      {
        this.store.dispatch(sendPrompt({prompt:this.prompts}))
        this.GPTresponse$ = this.store.select(getGptResponse)
        this.showLoading$ =this.store.select(getLoading)
      }

      // this.prompts="create a 4 day itinerary for Japan,Hokkaido from 29/03/2024-01/04/2024"

      //   this.store.dispatch(sendPrompt({prompt:this.prompts}))
      //   this.GPTresponse$ = this.store.select(getGptResponse)
      //   this.showLoading$ =this.store.select(getLoading)
      
      
      //remove the extra setLoadingSpinner after all the webpage designing
      // this.store.dispatch(setLoadingSpinner({status:false}));


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
  
    openDialog()
    {
      this.dialog.open(DialogTitleFormComponent,{
        width:'400px'
      });
    }
    
    openNoTitleDialog()
    {
      this.dialog.open(DialogNoTitleComponent,{
        width:'400px'
      })
    }

    Save()
    { 
      console.log(this.Title?.length);
      if(this.Title?.length === 1) //Space is considered as 1 character
      {
        this.openNoTitleDialog()
      }
      else{
        this.GPTresponse$.subscribe((response)=>
        {if(response)
          {
            this.GPTResponse=response
          }
          
        })
          
        this.store.dispatch(addItinerary({username:this.username,title:this.Title,startDate:this.startDate?.toLocaleDateString('es-CL'),endDate:this.endDate?.toLocaleDateString('es-CL'),response:this.GPTResponse}))

      }
    }
  }





