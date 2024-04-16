import { Component, inject } from '@angular/core';
import { GPTResponse } from '../../Models/gptModels';
import { Observable, Subject, Subscription } from 'rxjs';
import { LoginState } from '../Authentication/state/auth.state';
import { AppState } from '../../store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from '../shared/state/shared.action';
import { getLoading } from '../shared/state/shared.selector';
import { getTitle } from '../dialog-title-form/state/dialog.selector';
import { isLoginRegistered } from '../Authentication/state/auth.selector';
import { clearTitle } from '../dialog-title-form/state/dialog.action';
import { DialogTitleFormComponent } from '../dialog-title-form/dialog-title-form.component';
import { DialogNoTitleComponent } from '../dialog-no-title/dialog-no-title.component';
import { getItineraryID, getMongoResponse } from './state/viewItinerary.selector';
import { clearMongoResponse, editItineraryTitle } from './state/viewItinerary.action';
import { ItineraryService } from '../../Services/itinerary.service';
import { DialogPhotoComponent } from '../dialog-photo/dialog-photo.component';

@Component({
  selector: 'app-view-itinerary',
  templateUrl: './view-itinerary.component.html',
  styleUrl: './view-itinerary.component.css'
})
export class ViewItineraryComponent {

  private itinerarySvc=inject(ItineraryService)

  //Observable
  mongoResponse$!:Observable<GPTResponse|null>
  title$!:Observable<string|null>
  loginState$!:Observable<LoginState>
  itineraryID$!:Observable<string|null>
  
  //Loading spinner
  showLoading$!:Observable<boolean>;

  //Subscriptions
  titleSub!:Subscription
  loginStateSub!:Subscription
  idSub!:Subscription

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
  itineraryID!:string
  mongoResponse!:GPTResponse
  


  constructor(private store:Store<AppState>,public dialog: MatDialog)
  {
    
    this.showLoading$ = this.store.select(getLoading)

    //Title
    this.title$=this.store.select(getTitle)
    this.titleSub =this.title$.subscribe((data)=>{
      if(data)
      {
        this.Title = data
      }
    }

     
    )

  //  this.mongoResponse$ =  this.itinerarySvc.getItinerary("660e7d0d20b9890d42188ac1");

  

    //LoginState
    this.loginState$=this.store.select(isLoginRegistered)
    this.loginStateSub = this.loginState$.subscribe((loginState)=>{
      if(loginState.username)
      {
        this.username=loginState.username
      }
      });

    this.itineraryID$ = this.store.select(getItineraryID)
    this.idSub = this.itineraryID$.subscribe((id)=>
    { if(id)
      { this.itineraryID = id

      }})
    
   
        
        
  }
  ngOnDestroy(): void {
    //Clearing the states when leaving the page
    this.store.dispatch(clearTitle());
    this.store.dispatch(clearMongoResponse());
    //Must unsubscribe here as well, if not the memory would lead to multiple emissions during navigation in other components
    this.titleSub.unsubscribe();
    this.loginStateSub.unsubscribe();
    this.idSub.unsubscribe();
  }

  ngOnInit(): void {


        this.mongoResponse$= this.store.select(getMongoResponse);

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
        this.store.dispatch(editItineraryTitle({itineraryID:this.itineraryID,title:this.Title}));
      
      }
    }

    openPicture(link:string)
    {


      this.dialog.open(DialogPhotoComponent,{
        width:'660px',
        data:{link}
      });

    }


    locationSearch(location:string,country:string,region:string)
    {
       window.open("https://www.google.com/search?q="+country+", "+region+", "+ location, '_blank');
    }

}
