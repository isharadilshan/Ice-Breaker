import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TaskService } from 'src/app/shared/utils/task.service';
import { Task } from 'src/app/models/task';
import { TaskFilterService } from 'src/app/shared/utils/task-filter.service';
import { ArraySplitterService } from '../../shared/utils/array-splitter.service';

@Component({
  selector: 'app-p-tasks',
  templateUrl: './p-tasks.component.html',
  styleUrls: ['./p-tasks.component.scss']
})
export class PTasksComponent implements OnInit {

  p1Tasks; p2Tasks; p3Tasks; p4Tasks; p5Tasks; prioritizedChunks;
  pendingTasks: Task[];
  prioritizedTasks: Task[]=[];

  constructor(private service: TaskService, private priorityService: TaskFilterService, public arraySplitter: ArraySplitterService) { }

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
        this.prioritizedChunks = this.arraySplitter.chunkify(this.prioritizedTasks,5,true);
        console.log(this.prioritizedChunks);
        [ this.p1Tasks, this.p2Tasks, this.p3Tasks, this.p4Tasks, this.p5Tasks ] = this.prioritizedChunks;

      }
    );//observable to get data on init

  }

  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    margin: 15,
    autoplay: true,
    autoplaySpeed: 4000,
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
