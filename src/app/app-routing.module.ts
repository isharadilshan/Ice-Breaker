import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';

import { SecuredInnerPagesGuard } from "./shared/auth/secured-inner-pages.guard";
import { AuthGuard } from './shared/auth/auth.guard';
import { CreatedComponent } from './pages/created/created/created.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'admin-panel', component: AdminpanelComponent, canActivate: [ AuthGuard ], data: {roles: ["adminUser", "normalUser"]} },
  { path: 'sign-in', component: SigninComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'sign-up', component: SignupComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'forgot-password', component: ForgetPasswordComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'verify-email', component: VerifyEmailComponent, canActivate: [ SecuredInnerPagesGuard ] },
  { path: 'request-permission', component: CreatedComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
