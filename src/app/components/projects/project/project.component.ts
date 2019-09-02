import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../../shared/project.service';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private service: ProjectService, private notificationService: NotificationService, public dialogRef: MatDialogRef<ProjectComponent>) { }

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
      }else{
        this.service.updateProject(this.service.form.value);
      }
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success('Submitted Successfully');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
