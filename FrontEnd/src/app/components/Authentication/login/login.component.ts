import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loginStart } from '../state/auth.actions';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import { Router } from '@angular/router';
import { User } from '../../../Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm!:FormGroup;
  errorMessageUser:String = '';
  errorMessagePass:String = '';
  hide = true;

  constructor(private store:Store<AppState>, private router:Router)
  {
    this.loginForm = this.createLoginForm();



  }

  ngOnInit():void
  {
      

  }


  createLoginForm():FormGroup
  {
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

  updateUserErrorMessage() {
    if (this.loginForm.get('email')?.hasError('required')) {
      this.errorMessageUser = 'You must enter a value';
    } else if (this.loginForm.get('email')?.hasError('email')) {
      this.errorMessageUser = 'Not a valid email';
    } else {
      this.errorMessageUser = '';
    }
  }

  updatePassErrorMessage(){
    if (this.loginForm.get('password')?.hasError('required')) {
      this.errorMessagePass = 'You must enter a value';
    } 
     else {
      this.errorMessagePass = '';
    }

  }



  onLoginSubmit(){

    // this.router.navigate(['/']);
    const userForm:User = this.loginForm.value
    this.store.dispatch(loginStart({user:userForm}));
    console.log(this.loginForm.value)
  }




}
