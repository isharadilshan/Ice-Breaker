import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-pending-tasks',
  templateUrl: './pending-tasks.component.html',
  styleUrls: ['./pending-tasks.component.scss'],
  animations: [
    trigger('items', [
      transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
        style({ transform: 'scale(1)', opacity: 1 }))  // final
      ]),
      transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', 
        style({ 
           transform: 'scale(0.5)', opacity: 0, 
           height: '0px', margin: '0px' 
        })) 
      ])
    ]),
    trigger('list', [
      transition(':enter', [
      query('@items', stagger(300, animateChild()),{ optional: true })
      ]),
    ])
  ]
})
export class PendingTasksComponent implements OnInit {

  pendingTasks: Task[];
  priorityPendings: Task[]=[];

  constructor(private service: TaskService) {}

  ngOnInit() {

    this.service.getPendingTasks().subscribe(
      list => {
        this.pendingTasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.pendingPriority(this.pendingTasks);
      }
    );//observable to get data on init

    let item;

    timer(0, 5000)
    .pipe(
      tap(v => {

        item = this.priorityPendings.shift();
        
      })
    ).subscribe();

    timer(0, 5000)
    .pipe(
      tap(v => {
        
        this.priorityPendings.push(item);
        
      })
    ).subscribe();

  }

  pendingPriority(pendingTasks){

    this.priorityPendings = pendingTasks.map(element => {
      let ets = element.deadlineTimeStamp - Date.now();
      let day2 = 172800000;
      let day1 = 86400000;
      let day4 = 345600000;

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

  }

}
