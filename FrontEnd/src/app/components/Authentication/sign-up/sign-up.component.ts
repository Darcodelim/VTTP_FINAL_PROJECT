import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AppState } from '../../../store/app.state';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../../Models/User';
import { signUpStart } from '../state/auth.actions';
import { animate, state, style, transition, trigger } from '@angular/animations';

const imageState=  trigger('imageState',[state('visible',style({opacity:1
  
})),state('hidden',style({opacity:0})),
transition('hidden=>visible',[animate('1s ease-in')]),
transition('visible=>hidden',[animate('800ms ease-out')])

])

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  animations:[imageState]
})
export class SignUpComponent  {

  signUpForm!:FormGroup;
  errorMessageUser:String = '';
  errorMessagePass:String = '';
  errorMessageconfirmPass:String ='';
  hidePassword = true;
  hideConfirmPassword =true;



  // Background
  currentImageIndex = 0;
  imageUrls = ['/assets/signUpImages/frank-mckenna-OD9EOzfSOh0-unsplash.jpg','assets/signUpImages/priscilla_philip.jpg','assets/signUpImages/diego-ph-VmRxRz0gD_s-unsplash.jpg','assets/signUpImages/pedro-lastra-Nyvq2juw4_o-unsplash.jpg']
  currentImageUrl!:string;
  imageState = 'visible';

  constructor(private store:Store<AppState>, private router:Router)
  {
    this.signUpForm = this.createLoginForm();



  }


  ngOnInit():void
  {   
    this.showNextImage();
    setInterval(() => {
      this.showNextImage();
    }, 5000); // Change image every 5 seconds


  }

  showNextImage() {
    //visible to hidden takes 800ms, at the same time the time out is running. So the photo should be totally hidden first before switching the next photo
    this.imageState='hidden';
    setTimeout(()=>{
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageUrls.length;
      this.currentImageUrl = this.imageUrls[this.currentImageIndex];
      this.imageState = 'visible'

    },900)
    // Waiting for 900ms before executing the function inside

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
    const formEmail = this.signUpForm.value.email
    const confirmPassword =  this.signUpForm.value.confirmPassword

    const userForm:User = {
      email:formEmail,
      password:confirmPassword
    }
    


    // this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signUpStart({user:userForm}));
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