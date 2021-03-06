import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EpkComponent } from './epk/epk.component';

const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'epk', component: EpkComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		EpkComponent
	],
	imports: [
		BrowserAnimationsModule,
		BrowserModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes, {
				scrollPositionRestoration: 'enabled',
				preloadingStrategy: PreloadAllModules
			}
		),
	],
	exports: [
		RouterModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
