import { Component, OnInit, inject } from '@angular/core';
import { ItineraryService } from '../../Services/itinerary.service';
import { GPTResponse } from '../../Models/gptModels';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { sendPrompt } from './state/gpt.action';
import { getGptResponse } from './state/gpt.selector';

@Component({
  selector: 'app-gpt',
  templateUrl: './gpt.component.html',
  styleUrl: './gpt.component.css'
})
export class GPTComponent implements OnInit {

  private itinerarySvc=inject(ItineraryService)

  GPTresponse$!:Observable<GPTResponse|null>

  prompts:string = "create a 4 day itinerary for Japan in Hokkaido from 8/4/24-11/4/24"

  constructor(private store:Store<AppState>)
  {
    console.log(this.prompts)
    // this.GPTresponse$=this.itinerarySvc.getGptResponse(this.prompts)

  }
  ngOnInit(): void {
    this.store.dispatch(sendPrompt({prompt:this.prompts}))
    this.GPTresponse$ = this.store.select(getGptResponse)
  }




}
