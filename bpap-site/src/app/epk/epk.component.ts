import { Component, OnInit, OnDestroy } from '@angular/core';
import { Album } from '../classes/album';
import { AlbumService } from '../services/album.service';
import * as animations from './epk-animations';
import { fromEvent, Observable, Subscription } from 'rxjs';

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

export class EpkComponent implements OnInit, OnDestroy {
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

	// observable for window size detection
	resizeObservable$: Observable<Event>;
	resizeSubscription$: Subscription;

	// counter for cascade animation
	i: number;
	showDelay: number;
	hideDelay: number;
	showDelayDefault: number;
	hideDelayDefault: number;

	ngOnInit(): void {
		this.retrieveAlbums();

		// show outline / links when screen is smaller than 1245
		this.resizeObservable$ = fromEvent(window, 'resize');
    	this.resizeSubscription$ = this.resizeObservable$.subscribe( evt => {
			const currentWindow = evt.target as Window;
			if (currentWindow.innerWidth < 1262) {
				/*
				this.togglestate.fill('on');
				this.outlinehover.fill('show');
				this.linkhover.fill('show');
				*/
				this.showDelay = 20;
				this.hideDelay = 10;
			} else {
				this.showDelay = this.showDelayDefault;
				this.hideDelay = this.hideDelayDefault;
			}
    	});
	}

	ngOnDestroy() {
    	this.resizeSubscription$.unsubscribe();
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

		// default show / hide delay times for cascading music boxes
		this.showDelayDefault = 60;
		this.hideDelayDefault = 100;
		this.showDelay = this.showDelayDefault;
		this.hideDelay = this.hideDelayDefault;
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

	async showhideAllMusicBox() {
		if (!this.togglestate.includes('on')) {
			this.i = 0;
			this.showDelay = this.showDelayDefault;
			this.cascadeShow();
		} else if (!this.togglestate.includes('off')) {
			this.i = 0;
			this.hideDelay = this.hideDelayDefault;
			await this.cascadeHide();
		} else {
			this.togglestate.fill('on');
			this.outlinehover.fill('show');
			this.linkhover.fill('show');
		}
	}

	cascadeShow () {
		setTimeout(() => {
			this.togglestate[this.i] = 'on';
			this.outlinehover[this.i] = 'show';
			this.linkhover[this.i] = 'show';
			this.i++;
			if (this.i < this.togglestate.length) {
				this.cascadeShow();
			}
		}, this.showDelay);
	}

	async cascadeHide () {
		return new Promise((resolve) => {
			setTimeout(() => {
				this.togglestate[this.i] = 'off';
				this.outlinehover[this.i] = 'hide';
				this.linkhover[this.i] = 'hide';
				this.i++;
				if (this.i < this.togglestate.length) {
					this.cascadeHide();
					if (this.i > 0) {
						this.hideDelay = this.hideDelay / 2;
					}
				} else {
					resolve(this.i);
				}
			}, this.hideDelay);
		});
	}
}
