import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';


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
        query('@items', stagger(300, animateChild()))
      ]),
    ])
  ]
})
export class PendingTasksComponent implements OnInit {

  counter = 5;
  list = [1,2,3,4,5];

  constructor() { 

    // Array.prototype.rotate = function() {
    //   if (this.lastRotIndex === undefined) this.lastRotIndex = -1;
    //   this.lastRotIndex++;
    //   this.lastRotIndex %= this.length;
    //   return this[this.lastRotIndex];
    // };
    
    // function rotateInWindow(arr, windowSize) {
    //   const window = arr.slice(0, windowSize);
    //   arr = arr.slice(windowSize);
    //   setInterval(() => {
    //     window.shift();
    //     window.push(arr.rotate());
    //     console.log(window);
    //   }, 1000);
    // }
    
  }

  ngOnInit() {
  }

  add(){
    this.list.push(this.counter++);
  }

  remove(index) {
    if(!this.list.length) return;
    this.list.splice(index, 1);
  }

}
