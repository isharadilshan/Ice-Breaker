import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TaskService } from 'src/app/shared/utils/task.service';
import { Task } from 'src/app/models/task';
import { timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TaskFilterService } from 'src/app/shared/utils/task-filter.service';

@Component({
  selector: 'app-p-tasks',
  templateUrl: './p-tasks.component.html',
  styleUrls: ['./p-tasks.component.scss']
})
export class PTasksComponent implements OnInit {

  pendingTasks: Task[];
  prioritizedTasks: Task[]=[];

  constructor(private service: TaskService, private priorityService: TaskFilterService) { }

  ngOnInit() {
    this.service.getPendingTasks().subscribe(
      list => {
        this.pendingTasks = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });
        
        this.prioritizedTasks = this.priorityService.setDeadlinePriority(this.pendingTasks);
      }
    );//observable to get data on init

    timer(0, 5000)//observable stream 
    .pipe(
      tap(v => {

        // item = this.prioritizedTasks.shift();
        
      })
    ).subscribe();
  }

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 15,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: false
  }

  priorityStyle(task){
    let styles;
    if(task.priority == 'overdue'){
      styles = {
        'background-color': '#A1887F'
      };
    }else if(task.priority == 'red'){
      styles = {
        'background-color': '#f44336'
      };
    }else if(task.priority == 'yellow'){
      styles = {
        'background-color': '#FFF176'
      };
    }else{
      styles = {
        'background-color': '#81C784'
      };
    }
    return styles;
  }

}
