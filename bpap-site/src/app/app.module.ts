import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
		BrowserModule,
		RouterModule.forRoot(
			appRoutes, {
				enableTracing: true,
				scrollPositionRestoration: 'enabled'
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
