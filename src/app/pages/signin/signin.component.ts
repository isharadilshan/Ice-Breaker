import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public loginForm = new FormGroup({
    email: new FormControl('',  Validators.required),
    password: new FormControl('',  Validators.required),
   
  }); 

  ngOnInit() {
  }

  signIn(formData: FormData){

    try{
      this.authService.signIn(formData["email"], formData["password"]);
    }catch(err){
      console.log('Error when trying to login ///'+err);
    }

  }

}
