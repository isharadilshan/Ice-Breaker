import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const currentUser = this.authService.currentUser;

      if(currentUser){
        //check if the route is retricted by role
        if(next.data.roles && next.data.roles.indexOf(currentUser.role) === -1 && this.authService.isLoggedIn !== true){
          //role not authorized
          this.router.navigate(["request-permission"]);
          
        }else{
          console.log("Can Activate");
          return true;
        }
      }
  }
  
}
