import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TaskService } from 'src/app/shared/utils/task.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tasks: Task [];

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
      }
    );//observable to get data on init

  }

  customOptions: OwlOptions = {
    items: 4,
    loop: true,
    margin: 15,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: {//set no of mat cards per screen according to screen size
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

}
