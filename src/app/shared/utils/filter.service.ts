import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';
import { Const } from '../const/const';
import { Build } from 'src/app/components/builds/build-list/build-list.component';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  prioritizedTasks: Task[]=[];
  prioritizedBuilds: Build[]= [];
  dayMargin = Const.SECONDS_FOR_ONE_DAYS;

  constructor() { }

  setTaskPriority(tasks){

    this.prioritizedTasks = tasks.map(element => {

      let ets = element.deadlineTimeStamp - Date.now();

      if (ets < 0){ 
        // element.deadline = 'overdue';
        element.priority = 'overdue';
      }else if(ets > 0 && ets < this.dayMargin){
        // element.deadline = 'red';
        element.priority = 'high';
      }else{
        element.deadline = 'normal';
      }
      return element;
    });

    return this.prioritizedTasks;

  }

  setBuildPriority(builds){

    this.prioritizedBuilds = builds.map(element => {

      let ets = element.buildExpireTimestamp - Date.now();
      let bld = Date.now() - element.buildTimestamp;

      if (ets < 0){ 
        element.priority = 'overdue';
      }else if(bld > 0 && bld < this.dayMargin){
        element.priority = 'green';
      }else{
        element.priority = 'normal';
      }
      return element;
    });

    return this.prioritizedBuilds;

  }
}
