import { Component } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { loginStart } from '../state/auth.actions';
import { Router } from '@angular/router';
import { User } from '../../../Models/User';
import { animate, state, style, transition, trigger } from '@angular/animations';




const imageState=  trigger('imageState',[state('visible',style({opacity:1
  
})),state('hidden',style({opacity:0})),
transition('hidden=>visible',[animate('1s ease-in')]),
transition('visible=>hidden',[animate('800ms ease-out')])

])




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations:[imageState]
})
export class LoginComponent {

  loginForm!:FormGroup;
  errorMessageUser:String = '';
  errorMessagePass:String = '';
  hide = true;

  // Background
  currentImageIndex = 0;
  imageUrls = ['/assets/signUpImages/frank-mckenna-OD9EOzfSOh0-unsplash.jpg','assets/signUpImages/priscilla_philip.jpg','assets/signUpImages/diego-ph-VmRxRz0gD_s-unsplash.jpg','assets/signUpImages/pedro-lastra-Nyvq2juw4_o-unsplash.jpg']
  currentImageUrl!:string;
  imageState = 'visible';

  constructor(private store:Store<AppState>, private router:Router)
  {
    this.loginForm = this.createLoginForm();



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
