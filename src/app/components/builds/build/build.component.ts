import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/utils/project.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { MatDialogRef } from '@angular/material';
import { ServerService } from 'src/app/shared/utils/server.service';
import { BuildService } from 'src/app/shared/utils/build.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  projects = [];
  servers = [];
  buildTime = '';
  buildDate = '';
  buildExpireTime = '';
  buildxpireDate = '';

  constructor(public service: BuildService, private projectService: ProjectService, private serverService: ServerService, private notificationService: NotificationService, public dialogRef: MatDialogRef<BuildComponent>) { }

  ngOnInit() {

    this.buildTime = 

    this.service.getBuilds();
    
    this.projectService.getProjects().subscribe(
      list => {
        this.projects = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
      }
    );//observable to get data on init

    this.serverService.getServers().subscribe(
      list => {
        this.servers = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
      }
    );//observable to get data on init

  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertBuild(this.service.form.value);
        this.notificationService.success('Submitted Successfullly');
      }else{
        this.service.updateBuild(this.service.form.value);
        this.notificationService.success('Updated Successfullly');
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
