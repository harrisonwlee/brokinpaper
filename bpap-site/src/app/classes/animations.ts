/*project animations*/
import {trigger, state, transition, style, animate, group, query, animateChild} from '@angular/animations';

export const fadeInOutAnimation =
	trigger('fadeInOut', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate('200ms', style({ opacity: 1 })),
	]),
	transition(':leave', [
		animate('0ms', style({ opacity: 0 }))
	])
]);

export const fadeInOutEaseOutAnimation =
	trigger('fadeInOutEaseOut', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate('200ms', style({ opacity: 1 })),
	]),
	transition(':leave', [
		animate('20ms', style({ opacity: 0 }))
	])
]);

export const MusicBoxHoverAnimation =
	trigger('MusixBoxHover', [
	state('hide', style({
		backgroundColor: 'transparent',
		color: 'white'
	})),
	state('show', style({
		// opacity: 1,
		// backgroundColor: '#707070',
		backgroundColor: '#e3e3e3',
		color: 'black'
	})),
	transition('hide=>show', [
		group([
			query('@MusicBoxLinksHover', animateChild()),
			animate('400ms'),
		]),
	]),
	transition('show=>hide', [
		group([
			query('@MusicBoxLinksHover', animateChild()),
			animate('600ms'),
		]),
	]),
]);

export const MusicBoxLinksAnimation =
	trigger('MusicBoxLinksHover', [
	state('hide', style({
		opacity: 0
	})),
	state('show', style({
		opacity: 1
	})),
	transition('hide=>show', animate('800ms')),
	transition('show=>hide', animate('500ms'))
]);
