import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredInnerPagesGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(this.authService.isLoggedIn) {
      window.alert("You already logged in !!!");
      this.router.navigate(['admin-panel'])
    }
    return true;
  }
  
}
