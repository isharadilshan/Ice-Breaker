import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TaskService } from 'src/app/shared/task.service';
import { Task } from '../../models/task';
import { database } from 'firebase';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task [];
  ptasks: Task [];
  pendingTasks: Task[];
  color: string;

  constructor(private service: TaskService) { }

  ngOnInit() {

    this.service.getSummaryTasks().subscribe(
      list => {
        this.tasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.summaryPriority(this.tasks);
        // console.log(this.tasks);
      }
    );//observable to get data on init

    this.service.getPendingTasks().subscribe(
      list => {
        this.pendingTasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.pendingPriority(this.pendingTasks);
        // console.log(this.pendingTasks);
      }
    );//observable to get data on init
  }

  customOptions: OwlOptions = {
    items: 4,
    loop: true,
    margin: 15,
    // dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    // nav: true,
    responsive: {
        0: {
            items: 1
        },
        479: {
            items: 1
        },
        768: {
            items: 2
        },
        979: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
  }

  summaryPriority(tasks){

    this.ptasks = tasks.forEach(element => {
      let eta = element.deadlineTimestamp - Date.now();
      let day2 = 172800000;
      if (eta < 0){ 
      console.log("inside the if condition");
        element.priorityColor = 'Red';
      }else if(eta > 0 && eta < day2){
        element.priorityColor = 'Green';
      }else{
        element.priorityColor = 'Yellow';
      }
    });

    console.log(this.ptasks);

  }

  pendingPriority(tasks){

  }

}
