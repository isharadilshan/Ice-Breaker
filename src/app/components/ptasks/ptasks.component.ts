import { Component, AfterViewInit, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-ptasks',
  templateUrl: './ptasks.component.html',
  styleUrls: ['./ptasks.component.scss']
})
export class PtasksComponent implements OnInit,AfterViewInit {
  
  mySwiper: Swiper;
  pendingTasks: Task[];
  priorityPendings: Task[];

  constructor(private service: TaskService) { }

  ngOnInit(){
    
    this.service.getPendingTasks().subscribe(
      list => {
        this.pendingTasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.pendingPriority(this.pendingTasks);
        console.log(this.pendingTasks);
      }
    );//observable to get data on init

  }


  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        // autoplay: true,
        loop: true,
        spaceBetween: 50,
        slidesPerView: 4,
        slidesPerGroup: 4,
        height: 0,
    });
  }

  pendingPriority(pendingTasks){

    this.priorityPendings = pendingTasks.map(element => {
      let ets = element.deadlineTimeStamp - Date.now();
      let day2 = 172800000;
      let day1 = 86400000;
      let day4 = 345600000;
      console.log(ets);
      if (ets < 0){ 
        element.deadline = 'overdue';
        element.priority = 'overdue';
      }else if(ets > 0 && ets < day2){
        element.deadline = 'red';
      }else if(ets > day2 && ets < day4){
        element.deadline = 'yellow';
      }else{
        element.deadline = 'green';
      }
      return element;
    });
    console.log(this.priorityPendings);

  }

}
