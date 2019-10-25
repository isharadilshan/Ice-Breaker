import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    title: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    project: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    deadlineDate: new FormControl('',Validators.required),
    deadlineTime: new FormControl('',Validators.required),
    isDone: new FormControl(false)
  });


  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) {}

  taskList: AngularFireList<any>;

  initializeFormGroup(){
    this.form.setValue({
      $key: null,
      title: '',
      description: '',
      project: '',
      priority: '',
      deadlineDate: '',
      deadlineTime: '',
      isDone: false
    });
  }

  getTasks(){
    this.taskList = this.firebase.list('tasks');
    return this.taskList.snapshotChanges(); //observable return from this function getTasks
  }

  getSummaryTasks(){
    this.taskList = this.firebase.list('tasks', ref => ref.orderByChild('category').equalTo('summary'));
    return this.taskList.snapshotChanges(); //observable return from this function getTasks
  }

  getPendingTasks(){
    this.taskList = this.firebase.list('tasks', ref => ref.orderByChild('category').equalTo('pending'));
    return this.taskList.snapshotChanges(); //observable return from this function getTasks 
  }

  insertTask(task){
    this.taskList.push({
      title: task.title,
      description: task.description,
      project: task.project,
      priority: task.priority,
      deadlineDate: task.deadlineDate =="" ? "" : this.datePipe.transform(task.deadlineDate, 'yyyy-MM-dd'),
      deadlineTime: task.deadlineTime,
      deadlineTimeStamp: task.deadlineDate !== null ? Date.parse(task.deadlineDate)+task.deadlineTime.split(':')[0]*3600000+task.deadlineTime.split(':')[1]*60000 : null,
      addedTime: Date.now(),
      isDone: task.isDone

    });
  }

  updateTask(task){
    this.taskList.update(task.$key,
      {
        title: task.title,
        description: task.description,
        project: task.project,
        priority: task.priority,
        deadlineDate: task.deadlineDate =="" ? "" : this.datePipe.transform(task.deadlineDate, 'yyyy-MM-dd'),
        deadlineTime: task.deadlineTime,
        deadlineTimeStamp: task.deadlineDate !== null ? Date.parse(task.deadlineDate)+task.deadlineTime.split(':')[0]*3600000+task.deadlineTime.split(':')[1]*60000 : null,
        isDone: task.isDone

    });
  }

  deleteTask($key: string){
    this.taskList.remove($key);
  }

  populateForm(task){
    this.form.setValue(_.omit(task,'addedTime','deadlineTimeStamp','category'));
  }
}
