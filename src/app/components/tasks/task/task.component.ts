import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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

  form: FormGroup;

  projects = [
    {id: 3, value: 'Project 1'},
    {id: 4, value: 'Project 2'},
    {id: 5, value: 'Project 3'}

  ];

  constructor(private service: TaskService, private projectService: ProjectService, private notificationService: NotificationService, public dialogRef: MatDialogRef<TaskComponent>) {

    this.form = new FormGroup({
      $key: new FormControl(null),
      title: new FormControl('',Validators.required),
      description: new FormControl('',Validators.required),
      project: new FormControl('',Validators.required),
      category: new FormControl('',Validators.required),
      priority: new FormControl('',Validators.required),
      deadlineDate: new FormControl('',Validators.required),
      deadlineTime: new FormControl('',Validators.required),
      isDone: new FormControl(false)
    });

  }

  ngOnInit() {
    this.service.getTasks();
  }

  onClear(){
    this.form.reset();
    this.initializeFormGroup();
  }

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      title: '',
      description: '',
      project: '',
      category: '',
      priority: '',
      deadlineDate: '',
      deadlineTime: '',
      isDone: false
    });
  }

  onSubmit() {
    if(this.form.valid){
      this.service.insertTask(this.form.value);
      this.form.reset();
      this.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfullly');
      this.onClose();
    }
  }

  onClose(){
    this.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }

  populateForm(task){
    console.log(task);
    this.form.setValue(_.omit(task,'addedTime'));
  }

}
