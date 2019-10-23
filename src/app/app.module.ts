import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskComponent } from './components/tasks/task/task.component';
import { TaskService } from './shared/utils/task.service';
import { ProjectService } from './shared//utils/project.service';
import { environment } from '../environments/environment';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { AuthService } from './shared/auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { DevicesComponent } from './components/devices/devices.component';
import { DeviceComponent } from './components/devices/device/device.component';
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { DeviceService } from './shared/utils/device.service';
import { PTasksComponent } from './components/p-tasks/p-tasks.component';
import { ServersComponent } from './components/servers/servers.component';
import { ServerComponent } from './components/servers/server/server.component';
import { ServerListComponent } from './components/servers/server-list/server-list.component';
import { ServerService } from './shared/utils/server.service';
import { BuildsComponent } from './components/builds/builds.component';
import { BuildComponent } from './components/builds/build/build.component';
import { BuildListComponent } from './components/builds/build-list/build-list.component';
import { DashboardBuildsComponent } from './components/dashboard-builds/dashboard-builds.component';
import { DashboardTasksComponent } from './components/dashboard-tasks/dashboard-tasks.component';

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
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
    DevicesComponent,
    DeviceComponent,
    DeviceListComponent,
    PTasksComponent,
    ServersComponent,
    ServerComponent,
    ServerListComponent,
    BuildsComponent,
    BuildComponent,
    BuildListComponent,
    DashboardBuildsComponent,
    DashboardTasksComponent
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
    AngularFireAuthModule
  ],
  providers: [ TaskService, ProjectService, DeviceService, ServerService, DatePipe, AuthService, AngularFirestore ],
  bootstrap: [ AppComponent ],
  entryComponents: [ TaskComponent, ProjectComponent, DeviceComponent, ServerComponent, BuildComponent ]
})
export class AppModule { }
