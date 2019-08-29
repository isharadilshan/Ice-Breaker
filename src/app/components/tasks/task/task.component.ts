import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import * as _ from 'lodash';

import { TaskService } from '../../../shared/task.service';
import { ProjectService } from '../../../shared/project.service';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  projects = [
    {id: 3, value: 'Project 1'},
    {id: 4, value: 'Project 2'},
    {id: 5, value: 'Project 3'}

  ];

  constructor(private service: TaskService, private projectService: ProjectService, private notificationService: NotificationService, public dialogRef: MatDialogRef<TaskComponent>) { }

  ngOnInit() {
    this.service.getTasks();
  }

  onClear(){
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if(this.service.form.valid){
      this.service.insertTask(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfullly');
      this.onClose();
    }
  }

  onClose(){
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

}
