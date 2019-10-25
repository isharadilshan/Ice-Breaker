import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';
import { Task } from '../tasks/task-list/task-list.component';
import { TaskService } from 'src/app/shared/utils/task.service';
import { FilterService } from 'src/app/shared/utils/filter.service';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-tasks',
  templateUrl: './dashboard-tasks.component.html',
  styleUrls: ['./dashboard-tasks.component.scss'],
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


export class DashboardTasksComponent implements OnInit {

  tasks: Task[];
  prioritizedTasks: Task[]=[];

  constructor(private service: TaskService, private filterService: FilterService) { }

  ngOnInit() {

    this.service.getTasks().subscribe(
      list => {
        this.tasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        this.prioritizedTasks = this.filterService.setTaskPriority(this.tasks);
      }
    );//observable to get data on init

      let item;

      timer(0, 5000)//observable stream 
      .pipe(
        tap(v => {

          item = this.prioritizedTasks.shift();
          
        })
      ).subscribe();

      timer(0, 5000)
      .pipe(
        tap(v => {
          
          this.prioritizedTasks.push(item);
          
        })
      ).subscribe();
  }

  priorityStyle(task){
    let styles;
    if(task.priority == 'overdue'){
      styles = {
        'background-color': '#A1887F'//mat-brown
      };
    }else if(task.priority == 'high'){
      styles = {
        'background-color': '#f44336'//mat-red
      };
    }else if(task.priority == 'medium'){
      styles = {
        'background-color': '#81C784'//mat-green
      };
    }else{
      styles = {
        'background-color': '#FBC02D'//mat-yellow
      };
    }
    return styles;
  }

}
