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

  setBuildPriority(builds){

    this.prioritizedBuilds = builds.map(element => {

      let ets = element.buildExpireTimestamp - Date.now();
      let bld = Date.now() - element.buildTimestamp;
      let day1 = Const.SECONDS_FOR_ONE_DAYS;
      let day2 = Const.SECONDS_FOR_TWO_DAYS;
      let day4 = Const.SECONDS_FOR_FOUR_DAYS;

      if (ets < 0){ 
        element.priority = 'overdue';
      }else if(bld > 0 && bld < day1){
        element.priority = 'green';
      }else{
        element.priority = 'normal';
      }
      return element;
    });

    return this.prioritizedBuilds;

  }
}
