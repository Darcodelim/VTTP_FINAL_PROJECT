import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppState } from '../../../store/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnChanges {

  signUpForm!:FormGroup;
  errorMessageUser:String = '';
  errorMessagePass:String = '';
  errorMessageconfirmPass:String ='';
    hidePassword = true;
    hideConfirmPassword =true;

  constructor(private store:Store<AppState>, private router:Router)
  {
    this.signUpForm = this.createLoginForm();



  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit():void
  {   


  }

  createLoginForm():FormGroup
  {
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required]),
      confirmPassword:new FormControl('',[Validators.required])
    },
    {
      validators:confirmPasswordValidator
    }
    )
  }

  updateUserErrorMessage() {
    if (this.signUpForm.get('email')?.hasError('required')) {
      this.errorMessageUser = 'You must enter a value';
    } else if (this.signUpForm.get('email')?.hasError('email')) {
      this.errorMessageUser = 'Not a valid email';
    } else {
      this.errorMessageUser = '';
    }
  }

  updatePassErrorMessage(){
    if (this.signUpForm.get('password')?.hasError('required')) {
      this.errorMessagePass = 'You must enter a value';
    } 
     else {
      this.errorMessagePass = '';
    }

  }


  onSignUpSubmit(){

    this.router.navigate(['/']);
    // this.store.dispatch(setLoadingSpinner({status:true}))
    // this.store.dispatch(loginStart({user:User}));
    // console.log(this.signUpForm.value)
  }

}

//https://danielk.tech/home/angular-material-form-validation
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  // there is a logic error, this version allows confirmPassword to be valid. the previous version prevents the form from being valid
  return password && confirmPassword && password.value === confirmPassword.value ? null : {mismatch:true};
};