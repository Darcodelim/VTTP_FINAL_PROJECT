import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewItineraryComponent } from '../view-itinerary/view-itinerary.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-photo',
  templateUrl: './dialog-photo.component.html',
  styleUrl: './dialog-photo.component.css'
})
export class DialogPhotoComponent {




  constructor(@Inject(MAT_DIALOG_DATA) public data:{link:string})
  {


  }



}
