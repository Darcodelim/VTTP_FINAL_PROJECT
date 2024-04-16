import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReponseError } from '../gpt/state/gpt.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dialog-gpt-response-error',
  templateUrl: './dialog-gpt-response-error.component.html',
  styleUrl: './dialog-gpt-response-error.component.css'
})
export class DialogGptResponseErrorComponent {

  constructor(private router:Router,private store:Store)
  {

  }

  redirectBacktoSearch()
  {
    this.store.dispatch(ReponseError({error:false}));
    this.router.navigate(['/search']);
  }
}
