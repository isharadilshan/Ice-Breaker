import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase'; 
import { NullTemplateVisitor } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if(!authState){
        return null;
      }else{
        return authState.uid;
      }
    })
  );
   
  isAdmin = observableOf(true);

  constructor(private afAuth: AngularFireAuth) { }

  login(){
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }
}
