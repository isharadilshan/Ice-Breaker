import { Injectable } from '@angular/core';
import { User } from './user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  admin: boolean;
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afs: AngularFirestore,
  ) { 
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async  login(email, password) {
    if (email) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
        (credential) => {
          this.updateUserData(credential.user);
          console.log(credential.user.email);
        }
      ).then(() => this.router.navigate(['/students']))
        .catch(function (error) {
          console.log(error);
          alert("Please try again..");
        });
    } else {
     
    }

  }



  logoutAdmin() {
    this.afAuth.auth.signOut();
    console.log("log out")
    this.router.navigate(['/login']);
  }
  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    // user.admin = true;
    // user.staff = false;
    console.log(user);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      // admin: user.admin,
      // staff: user.staff
    };

    return userRef.set(data, { merge: true });
  }
  // tslint:disable-next-line: ban-types
  public isAuthenticated(): Boolean {
    if (this.user$) { return true; }
    return false;
  }


}
