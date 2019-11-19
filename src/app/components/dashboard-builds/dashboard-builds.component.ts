import { Component, OnInit } from '@angular/core';
import { BuildService } from 'src/app/shared/utils/services/build.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { FilterService } from 'src/app/shared/utils/filter.service';
import { Build } from 'src/app/models/build';

@Component({
  selector: 'app-dashboard-builds',
  templateUrl: './dashboard-builds.component.html',
  styleUrls: ['./dashboard-builds.component.scss']
})
export class DashboardBuildsComponent implements OnInit {

  builds: Build[];
  prioritizedBuilds: Build[]=[];

  constructor(private service: BuildService, private filterService: FilterService, private router:Router) { }

  ngOnInit() {

    this.service.getBuilds().subscribe(
      list => {
        this.builds = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()//destructuring
          };
        });

        this.prioritizedBuilds = this.filterService.setBuildPriority(this.builds);
      }
    );//observable to get data on init

  }

  priorityStyle(build){
    let styles;
    if(build.priority == 'overdue'){
      styles = {
        'background-color': '#f44336'
      };
    }else if(build.priority == 'green'){
      styles = {
        'background-color': '#81C784'
      };
    }else{
      styles = {
        'background-color': '#3F51B5'
      };
    }
    return styles;
  }

  navigate(build){
    window.location.href = build.buildURL;
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
