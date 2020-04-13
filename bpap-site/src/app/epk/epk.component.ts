import { Component, OnInit } from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';

@Component({
	selector: 'app-epk',
	templateUrl: './epk.component.html',
	styleUrls: ['./epk.component.less'],
	animations: [
		trigger('fade-in', [
			state('in', style({opacity: 1})),
			transition(':enter', [
			style({opacity: 0}),
			animate(0)
			])
		])
	]
})
export class EpkComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
