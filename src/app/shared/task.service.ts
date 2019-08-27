import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private firebase: AngularFireDatabase) { }

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
      deadlineDate: task.deadlineDate,
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
}
