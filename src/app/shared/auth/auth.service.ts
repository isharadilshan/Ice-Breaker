import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private ngZone: NgZone, private afAuth: AngularFireAuth, private firestore: AngularFirestore , private router: Router) { 

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        console.log(this.currentUser);
        localStorage.setItem('user', JSON.stringify(this.currentUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  setUserStatus(userStatus: any): void {
    this.userStatus = userStatus;
    this.userStatusChanges.next(userStatus);
  }

  signUp(email:string, password:string){
  
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse)=>{
       // add the user to the "users" database
       let user = {
        id: userResponse.user.uid,
        email: userResponse.user.email,
        username: userResponse.user.displayName,
        role: "user",
       }
       
       //add the user to the database
       this.firestore.collection("users").add(user)
       .then(user => {
        user.get().then(x => {
          //return the user data
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          // this.sendVerificationMail();
          // this.router.navigate(["created"]);
        })
       }).catch(err => {
         console.log(err);
       })
           
     }).catch((error) => {
      window.alert(error.message);
    })
  }

  signIn(email: string, password: string) {
      
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
    .then((user)=>{
      this.firestore.collection("users").ref.where("username", "==", user.user.email).onSnapshot(snap =>{
        snap.forEach(userRef => {
          this.currentUser = userRef.data();
          //setUserStatus
          this.setUserStatus(this.currentUser)
          if(userRef.data().role == "adminUser" || userRef.data().role == "normalUser") {
            this.router.navigate(["admin-panel"]);
          }else{
            this.router.navigate(["request-permission"]);
          }
        })
      })
      
    }).catch((error) => {
      window.alert(error.message);
    })
  }

  signOut(){
    this.afAuth.auth.signOut()
    .then(()=>{
      console.log("user signed Out successfully");
      //set current user to null to be logged out
      this.currentUser = null;
      //set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.ngZone.run(() => this.router.navigate(["sign-in"]));
      localStorage.removeItem('user');

    }).catch((err) => {
      console.log(err);
    })
  }

  userChanges(){
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if(currentUser){
        this.firestore.collection("users").ref.where("username", "==", currentUser.email).onSnapshot(snap =>{
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            //setUserStatus
            this.setUserStatus(this.currentUser);

            if(userRef.data().role == "adminUser" || userRef.data().role == "normalUser") {
              this.ngZone.run(() => this.router.navigate(["admin-panel"])); 
            }else{
              this.ngZone.run(() => this.router.navigate(["request-permission"]));
            }
          })
        })
      }else{
        //function is running on refresh so its checking if the user is logged in or not
        //hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(["sign-in"]));
      }
    })
  }

  // Send email verfificaiton when new user sign up
  sendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify-email']);
    })
  }

  // Reset Forgot password
  forgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

}