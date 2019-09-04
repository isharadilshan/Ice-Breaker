import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TaskService } from './shared/task.service';
import { ProjectService } from './shared/project.service';
import { environment } from '../environments/environment';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { PendingTasksComponent } from './components/pending-tasks/pending-tasks.component';
import { LoginComponent } from './pages/login/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AdminpanelComponent,
    TasksComponent,
    TaskComponent,
    TaskListComponent,
    ProjectsComponent,
    ProjectComponent,
    ProjectListComponent,
    PendingTasksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [TaskService,ProjectService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [TaskComponent,ProjectComponent]
})
export class AppModule { }
