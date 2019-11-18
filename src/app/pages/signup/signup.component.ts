import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public signUpForm = new FormGroup({
    email: new FormControl('',  Validators.required),
    password: new FormControl('',  Validators.required),
   
  }); 

  ngOnInit() {
  }

  signUp(formData: FormData){
    try{
      this.authService.signUp(formData["email"],formData["password"]);
    }catch(err){
      console.log('Error when trying to sign up ///'+err);
    }
  }

}
