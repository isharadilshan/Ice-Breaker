import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, switchMap } from 'rxjs/operators';
import { auth } from 'firebase'; 
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable({
  providedIn: 'root'
})
export class UserService {

  // uid = this.afAuth.authState.pipe(
  //   map(authState => {
  //     if(!authState){
  //       return null;
  //     }else{
  //       return authState.uid;
  //     }
  //   })
  // );
   
  // isAdmin: Observable<boolean>= this.uid.pipe(
  //   switchMap(uid => {
  //     if(!uid){
  //       return observableOf(false);
  //     }else{
  //       return this.db.object<boolean>('/admin/' + uid).valueChanges();
  //     }
  //   })
  // )

  // isSuperAdmin: Observable<boolean>= this.uid.pipe(
  //   switchMap(uid => {
  //     if(!uid){
  //       return observableOf(false);
  //     }else{
  //       return this.db.object<boolean>('/superadmin/' + uid).valueChanges();
  //     }
  //   })
  // )

  // constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  // login(){
  //   this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }

  // logout(){
  //   this.afAuth.auth.signOut();
  // }
}
