import { Component, OnInit } from '@angular/core';
import { Album } from '../classes/album';
import * as animations from './epk-animations';

@Component({
	selector: 'app-epk',
	templateUrl: './epk.component.html',
	styleUrls: ['./epk.component.less'],
	animations: [
		animations.fadeInOutAnimation,
		animations.fadeInOutEaseOutAnimation,
		animations.MusicBoxHoverAnimation,
		animations.MusicBoxLinksAnimation
	]
})
export class EpkComponent implements OnInit {

	// social media booleans
	showig: boolean;
	showfb: boolean;
	showyt: boolean;
	showtw: boolean;

	// contact booleans
	showmgmt: boolean;
	showartist: boolean;

	// move to db eventually
	albums = [
		new Album(
			'Astro EP',
			'5/5/2016',
			'https://open.spotify.com/album/3WISXIoOeE0Vz3N8HV6Dnd?si=Bi6YwiGySOus9_kLThmNPg',
			'https://music.apple.com/album/astro-single/1355981302',
			'https://www.deezer.com/album/58366052',
			''
			),
		new Album('Hierarchy', '10/25/2018', '', '', '', ''),
		new Album('Nightwatch', '12/10/2018', '', '', '', ''),
		new Album('Leap', '1/24/2019', '', '', '', ''),
		new Album('Elysium', '7/1/2019', '', '', '', ''),
		new Album('The Maslow EP', '10/25/2019', '', '', '', ''),
		new Album('Librae', '12/26/2019', '', '', '', ''),
		new Album('Hemera', '4/9/2020', '', '', '', ''),
		new Album('Neo Brut', '4/20/2020', '', '', '', ''),
	];

	bphover: boolean;

	// array controls animation for hovering over albums
	outlinehover: string[] = new Array(this.albums.length);
	linkhover: string[] = new Array(this.albums.length);
	togglestate: string[] = new Array(this.albums.length);

	constructor() {
		this.showig = false;
		this.showfb = false;
		this.showyt = false;
		this.showtw = false;
		this.bphover = false;

		this.showmgmt = false;
		this.showartist = false;

		this.outlinehover.fill('hide');
		this.linkhover.fill('hide');
		this.togglestate.fill('off');
	}

	get sortedAlbums() {
		return this.albums.sort((a, b) => {
			return <any>new Date(b.rel_date) - <any>new Date(a.rel_date);
		});
	}

	showhideMusicBoxToggle(i) {
		if (this.togglestate[i] === 'off') {
			this.outlinehover[i] = 'show';
			this.linkhover[i] = 'show';
			this.togglestate[i] = 'on';
		} else if (this.togglestate[i] === 'on') {
			this.outlinehover[i] = this.outlinehover[i] === 'show' ? 'hide' : 'show';
			this.linkhover[i] = this.linkhover[i] === 'show' ? 'hide' : 'show';
			this.togglestate[i] = 'exit';
		}
	}

	showhideMusicBox(i) {
		if (this.togglestate[i] === 'off') {
			this.outlinehover[i] = this.outlinehover[i] === 'show' ? 'hide' : 'show';
			this.linkhover[i] = this.linkhover[i] === 'show' ? 'hide' : 'show';
		} else if (this.togglestate[i] === 'exit') {
			this.outlinehover[i] = 'hide';
			this.linkhover[i] = 'hide';
			this.togglestate[i] = 'off';
		} else if (this.togglestate[i] === 'on') {
			this.outlinehover[i] = 'show';
			this.linkhover[i] = 'show';
		}
	}


  	ngOnInit() {
  	}

}
