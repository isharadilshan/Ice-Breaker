import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  form: FormGroup;

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) {

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

  taskList: AngularFireList<any>;

  getTasks(){
    this.taskList = this.firebase.list('tasks');
    return this.taskList.snapshotChanges(); //observable return from this function getTasks
  }

  insertTask(task){
    this.taskList.push({
      title: task.title,
      description: task.description,
      project: task.project,
      category: task.category,
      priority: task.priority,
      deadlineDate: task.deadlineDate =="" ? "" : this.datePipe.transform(task.deadlineDate, 'yyyy-MM-dd'),
      deadlineTime: task.deadlineTime,
      addedTime: Date.now(),//var date = new Date(timestamp) // Wed Nov 23 2016 18:03:25 GMT+0800 (WITA)
      isDone: task.isDone

    });
  }

  updateTask(task){
    this.taskList.update(task.key,
      {
        title: task.title,
        description: task.description,
        project: task.project,
        category: task.category,
        priority: task.priority,
        deadlineDate: task.deadlineDatw,
        deadlineTime: task.deadlineTime,
        addedTime: task.addedTime,
        isDone: task.isDone

    });
  }

  deleteTask($key: string){
    this.taskList.remove($key);
  }

  initializeFormGroup(){
      
  }

  populateForm(task){
    this.form.setValue(task);
  }
}
