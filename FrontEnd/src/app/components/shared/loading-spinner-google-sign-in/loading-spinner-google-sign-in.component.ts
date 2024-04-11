import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, interval, map, takeWhile } from 'rxjs';
import { AppState } from '../../../store/app.state';
import { updateGoogleSigningInStatus } from '../../google-calendar/state/googleCalender.action';

@Component({
  selector: 'app-loading-spinner-google-sign-in',
  templateUrl: './loading-spinner-google-sign-in.component.html',
  styleUrl: './loading-spinner-google-sign-in.component.css'
})
export class LoadingSpinnerGoogleSignInComponent implements OnDestroy {

  countdownOb$!:Observable<number>
  countdownSeconds:number = 15;
  countdownSubscription!:Subscription;

  // signInStatus:boolean =false;

  signInFail:boolean=false;

  source = interval(1000);

  constructor(private store:Store<AppState>)
  {
      

      // setInterval(()=>this.countdown(this.countdownSeconds),1000)

      this.countdownSubscription = this.source.subscribe(()=>this.countdown())
  }
  ngOnDestroy(): void {
    this.countdownSubscription.unsubscribe();
  }

  stopCountdown()
  {
    if(this.countdownSubscription)
    {
      this.countdownSubscription.unsubscribe();
    }
  }

  countdown()
  {
    this.countdownSeconds--;

    if(this.countdownSeconds===0)
    {
      this.signInFail = true;
      this.stopCountdown();

    }
  }

  close()
  {
    // this.signInStatus = true;

    this.store.dispatch(updateGoogleSigningInStatus({signingInStatus:false}));
  }

  
}
