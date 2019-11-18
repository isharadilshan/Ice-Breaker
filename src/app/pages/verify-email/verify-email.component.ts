import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  sendVerificationMail(){
    try{
      this.authService.sendVerificationMail();
    }catch(err){
      console.log('Error when trying to send verification email ///'+err);
    } 
  }

}
