import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { googleCalendarService } from '../../Services/googleCalendar.service';
import { Observable, Subscription, interval, map, take, takeWhile } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { LoginState } from '../Authentication/state/auth.state';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { eventFormFormat } from '../../Models/googleCalendarModels';
import { getAuthorizationState, getGoogleSigningInState } from './state/googleCalendar.selector';
import { getAuthorizationStatus, updateAuthorizationStatus, updateGoogleSigningInStatus } from './state/googleCalender.action';
import { itineraryAddCalendarState } from '../itineries-list/state/itineriesList.state';
import { getItineraryAddCalendar } from '../itineries-list/state/itineriesList.selector';
import { resetAddItineraryCalendar } from '../itineries-list/state/itineriesList.action';

@Component({
  selector: 'app-google-calendar',
  templateUrl: './google-calendar.component.html',
  styleUrl: './google-calendar.component.css'
})
export class GoogleCalendarComponent implements OnInit,OnDestroy{

    private googleCalSvc = inject(googleCalendarService);

    //Observable
    loginState$!:Observable<LoginState>
    authorization$!:Observable<boolean>
    googleSigningIn$!:Observable<boolean>
    itineraryAddCalendar$!:Observable<itineraryAddCalendarState>;

    //Subscriptions
    authorizationStatusSub!:Subscription;
    loginStateSub!:Subscription;
    verifySub!:Subscription
    authorizationLinkSub!:Subscription;
    googleSigningInSub!:Subscription;
    itineraryAddCalendarSub!:Subscription;

    //Form
    eventForm!:FormGroup;

    //Variables
    link!:string;
    verify:boolean = false;
    googleSigningIn!:boolean;
    authWindow!: Window|null; 
    username!:string
    minDate!:Date;
    itineraryAddCalendarForm!:itineraryAddCalendarState;
    EventStatusSuccess!:string
    EventStatusFail!:string
    showSuccessMessage:boolean = false;
    showFailMessage:boolean = false;


    constructor(private store:Store<AppState>,private fb:FormBuilder)
    {
      this.authorization$ = this.store.select(getAuthorizationState)
      this.verifySub = this.authorization$.subscribe((status)=>{
        this.verify =status
      })

      if(!this.verify){
       this.authorizationLinkSub= this.googleCalSvc.getAuthorizationLink().subscribe((response)=>
        { this.link = response.authorizationURL
        console.log(this.link)}
       )

      }
      else{
        this.store.dispatch(updateGoogleSigningInStatus({signingInStatus:false}))
       }

      this.googleSigningIn$ =  this.store.select(getGoogleSigningInState)
      this.googleSigningInSub = this.googleSigningIn$.subscribe((status)=>{
        this.googleSigningIn = status;
      })

      

      this.itineraryAddCalendar$ = this.store.select(getItineraryAddCalendar)
      this.itineraryAddCalendarSub = this.itineraryAddCalendar$.subscribe((addCalendar)=>{
        this.itineraryAddCalendarForm = addCalendar;
      })

      this.eventForm = this.createEventForm();


    }

  ngOnInit(): void {

    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    
    
      
    
    

  //  this.authorizationStatusSub = interval(5000).pipe( takeWhile(()=>!this.verify)).subscribe(()=>
   
  //  this.googleCalSvc.verifyAuthorization(this.username).subscribe((response)=>{

  //     this.verify= response.authorizationStatus;
      

  //   }))

          //There is Cross-Origin-Opener-Policy problem when there is an action to close
      // if(this.verify)
      // {
      //   // this.authWindow?.close();
      //   this.authWindow?.postMessage('authorizationSuccessful', '*');

      // }


    // window.addEventListener('message', (event) => {
    //   // Check if the message indicates successful authorization
    //   if (event.data === 'authorizationSuccessful') {
    //     // Close the child window
    //     this.authWindow?.close();
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.authorizationStatusSub?.unsubscribe();
    this.loginStateSub.unsubscribe();
    this.verifySub.unsubscribe();

    this.store.dispatch(resetAddItineraryCalendar());

    if(!this.verify)
    {
      this.authorizationLinkSub.unsubscribe();
    }

    this.itineraryAddCalendarSub.unsubscribe();
    this.googleSigningInSub.unsubscribe();
  }

    redirectToGoogleSignIn() {
      if (this.link) {
        // Redirect to Google Sign-in URL
        // window.location.href = this.link;
        this.authWindow = window.open(this.link, '_blank');

        this.store.dispatch(updateGoogleSigningInStatus({signingInStatus:true}))

        //need to set a signing in loading page for 25 seconds.

        this.authorizationStatusSub = interval(5000).pipe( takeWhile(()=>!this.verify),take(12)).subscribe(()=>
   
        this.googleCalSvc.verifyAuthorization(this.username).subscribe({

          next:response=>{
            this.store.dispatch(updateAuthorizationStatus({authorizationStatus:response.authorizationStatus}))
            this.store.dispatch(updateGoogleSigningInStatus({signingInStatus:false}))
          },

          error:err=>{
            this.store.dispatch(updateAuthorizationStatus({authorizationStatus:err.error.authorizationStatus}))
            console.error(err)
          }
        
          }))



      } else {
        console.error("Google Sign-in URL is not available.");
      }
    }

    setMinDate()
    {
      const currentDate = new Date()
      this.minDate = currentDate
    }

    createEventForm():FormGroup
    {
      return this.fb.group({
        title: this.fb.control(''||this.itineraryAddCalendarForm.title),
        startDate: this.fb.control(''||new Date(this.dateFormatChanger(this.itineraryAddCalendarForm.startDate)),[Validators.required]),
        endDate:this.fb.control(''||new Date(this.dateFormatChanger(this.itineraryAddCalendarForm.endDate)),[Validators.required])
      })
    }
    
    onSubmit()
    {
      const eventForm:eventFormFormat  = this.eventForm.value

      console.log(eventForm.startDate)
      console.log(eventForm.endDate);
      this.googleCalSvc.setCalendarEvent(eventForm).subscribe({
        next:response=>{
        //This is the way to change to "Typescript" OBJECT, if we do not wish to create an interface
        const jsonString =  JSON.stringify(response);
        const parseJson = JSON.parse(jsonString);
         this.EventStatusSuccess = parseJson.Status;
         this.showSuccessMessage=true;
         setTimeout(()=>{
           this.showSuccessMessage=false;
         },4000)
      }, error:err=>{
        
        this.EventStatusFail = err.error.Error
        this.showFailMessage = true;
        setTimeout(()=>{
          this.showFailMessage=false;
        },4000)
      }
        
      
      })

      this.store.dispatch(resetAddItineraryCalendar());
      this.eventForm = this.createEventForm();
    }

    dateFormatChanger(date:string):string
    { 
      
      //changing from dd-mm-yyyy to yyyy-mm-dd

      return date.split("-").reverse().join("-");;
    }


    // verifyGoogleSignIn()
    // {

    //   this.googleCalSvc.verifyAuthorization().subscribe((response)=>
    //   { this.verify = response
    //     console.log(response)
    //   }
    //   )
    // }

    

}


