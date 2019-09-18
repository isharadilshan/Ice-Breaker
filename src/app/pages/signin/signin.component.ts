import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  signIn(email, password){

    try{
      this.authService.signIn(email, password);
    }catch(err){
      console.log('Error when trying to login ///'+err);
    }

  }

}
