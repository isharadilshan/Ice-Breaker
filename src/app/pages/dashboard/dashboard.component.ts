import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  smryTasks = [
    { title: 'Connect firebase', description: 'Implement firebase connection',priority: 'high' },
    { title: 'Resonsive design', description: 'Add carousel design' },
    { title: 'Connect firebase', description: 'Implement firebase connection' },
    { title: 'Resonsive design', description: 'Add carousel design' },
    { title: 'Connect firebase', description: 'Implement firebase connection',priority: 'high' },
    { title: 'Resonsive design', description: 'Add carousel design' },
    { title: 'Connect firebase', description: 'Implement firebase connection' },
    { title: 'Resonsive design', description: 'Add carousel design' }
  ];

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

}
