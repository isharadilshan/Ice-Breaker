import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Const } from '../const/const';

@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {

  prioritizedTasks: Task[]=[];

  constructor() { }

  setDeadlinePriority(tasks){

    this.prioritizedTasks = tasks.map(element => {

      let ets = element.deadlineTimeStamp - Date.now();
      let day1 = Const.SECONDS_FOR_ONE_DAYS;
      let day2 = Const.SECONDS_FOR_TWO_DAYS;
      let day4 = Const.SECONDS_FOR_FOUR_DAYS;

      if (ets < 0){ 
        // element.deadline = 'overdue';
        element.priority = 'overdue';
      }else if(ets > 0 && ets < day1){
        // element.deadline = 'red';
        element.priority = 'red';
      }else{
        element.deadline = 'normal';
      }
      return element;
    });

    return this.prioritizedTasks;

  }
}
