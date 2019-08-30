import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-ptasks',
  templateUrl: './ptasks.component.html',
  styleUrls: ['./ptasks.component.scss']
})
export class PtasksComponent implements AfterViewInit {

  mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit() {
    this.mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        // pagination: '.swiper-pagination',
        // paginationClickable: true,
        // nextButton: '.swiper-button-next',
        // prevButton: '.swiper-button-prev',
        autoplay: true,
        spaceBetween: 10,
        // height: 600, config one slide height
        autoHeight: true
    });
  }

}
