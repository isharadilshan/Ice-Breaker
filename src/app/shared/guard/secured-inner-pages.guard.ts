import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SecuredInnerPagesGuard implements CanActivate {

  constructor( public authService: AuthService, public router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // throw new Error("Method not implemented.");

    if(this.authService.isLoggedIn) {
      window.alert("You already logged in !!!");
      this.router.navigate(['admin-panel'])
    }
    return true;
  }
  
}
