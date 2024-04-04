import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { googleCalendarService } from '../../Services/googleCalendar.service';
import { Observable, Subscription, interval, map, takeWhile } from 'rxjs';
import { AppState } from '../../store/app.state';
import { Store } from '@ngrx/store';
import { LoginState } from '../Authentication/state/auth.state';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { eventFormFormat } from '../../Models/googleCalendarModels';
import { getAuthorizationState } from './state/googleCalendar.selector';
import { getAuthorizationStatus } from './state/googleCalender.action';

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

    //Subscriptions
    authorizationStatusSub!:Subscription;
    loginStateSub!:Subscription;
    verifySub!:Subscription
    authorizationLinkSub!:Subscription;

    //Form
    eventForm!:FormGroup;

    //Variables
    link!:string;
    verify:boolean = false;
    authWindow!: Window|null; 
    username!:string
    minDate!:Date;


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

    }

  ngOnInit(): void {

    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    
    
      this.eventForm = this.createEventForm()
    
    

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
    // this.authorizationStatusSub.unsubscribe();
    this.loginStateSub.unsubscribe();
    this.verifySub.unsubscribe();

    if(!this.verify)
    {
      this.authorizationLinkSub.unsubscribe();
    }
  }

    redirectToGoogleSignIn() {
      if (this.link) {
        // Redirect to Google Sign-in URL
        // window.location.href = this.link;
        this.authWindow = window.open(this.link, '_blank');
        this.store.dispatch(getAuthorizationStatus({username:this.username}));

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
        title: this.fb.control(''),
        startDate: this.fb.control('',[Validators.required]),
        endDate:this.fb.control('',[Validators.required])
      })
    }
    
    onSubmit()
    {
      const eventForm:eventFormFormat  = this.eventForm.value

      console.log(eventForm.startDate)
      console.log(eventForm.endDate);
      this.googleCalSvc.setCalendarEvent(eventForm).subscribe();
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


