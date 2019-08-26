import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { SummaryComponent } from './components/summary/summary.component';
import { PendingComponent } from './components/pending/pending.component';
import { AsummaryComponent } from './components/asummary/asummary.component';
import { ApendingComponent } from './components/apending/apending.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminpanelComponent,
    SummaryComponent,
    PendingComponent,
    AsummaryComponent,
    ApendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
