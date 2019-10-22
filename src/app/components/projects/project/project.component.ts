import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../shared/utils/project.service';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(public service: ProjectService, private notificationService: NotificationService, public dialogRef: MatDialogRef<ProjectComponent>) { }

  ngOnInit() {
    this.service.getProjects();
  } 
  
  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if(this.service.form.valid){
      if(!this.service.form.get('$key').value){
        this.service.insertProject(this.service.form.value);
        this.notificationService.success('Submitted Successfully');
      }else{
        this.service.updateProject(this.service.form.value);
        this.notificationService.success('Updated Successfully');
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
