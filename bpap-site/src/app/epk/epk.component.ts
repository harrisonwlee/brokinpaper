import { Component, OnInit } from '@angular/core';
import { Album } from '../classes/album';
import { AlbumService } from '../services/album.service';
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
	// albums array
	albums?: Album[];

	// date format for release date
	format: string;

	// default music links for albums
	defSpotify: string;
	defApple: string;
	defSoundCloud: string;
	defDeezer: string;
	defNapster: string;

	// social media booleans
	showig: boolean;
	showfb: boolean;
	showyt: boolean;
	showtw: boolean;

	// contact booleans
	showmgmt: boolean;
	showartist: boolean;

	bphover: boolean;

	// array controls animation for hovering over albums
	outlinehover: string[];
	linkhover: string[];
	togglestate: string[];

	ngOnInit(): void {
		this.retrieveAlbums();
  	}

	constructor(private albumService: AlbumService) {
		this.format = 'MM/dd/yyyy';
		this.defSpotify = 'https://open.spotify.com/artist/7mfA00WMGGGFbpeto1kVW9?si=8bBrWxEuSx2EGZNmX92ROg';
		this.defApple = 'https://music.apple.com/us/artist/brokinpaper/1352389235';
		this.defSoundCloud = 'https://soundcloud.com/brokinpaper';
		this.defDeezer = 'https://www.deezer.com/en/artist/11962993';
		this.defNapster = 'https://us.napster.com/artist/brokinpaper';

		this.showig = false;
		this.showfb = false;
		this.showyt = false;
		this.showtw = false;
		this.bphover = false;

		this.showmgmt = false;
		this.showartist = false;
	}

	retrieveAlbums(): void {
    	this.albumService.getAll()
      	.subscribe(
        data => {
			this.albums = data;
			this.albums.sort((a, b) => {
				return <any>new Date(b.release_date) - <any>new Date(a.release_date);
			});
			this.outlinehover = new Array(this.albums.length);
			this.linkhover = new Array(this.albums.length);
			this.togglestate = new Array(this.albums.length);
			this.outlinehover.fill('hide');
			this.linkhover.fill('hide');
			this.togglestate.fill('off');
        },
        error => {
			console.log(error);
        });
  	}

	/*
	get sortedAlbums() {
		return this.albums.sort((a, b) => {
			return <any>new Date(b.release_date) - <any>new Date(a.release_date);
		});
	}
	*/

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
}
