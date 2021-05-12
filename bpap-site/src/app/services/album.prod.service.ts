import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Album } from '../classes/album';

const baseUrl = 'https://brokinpaper.com/server';

@Injectable({
  	providedIn: 'root'
})
export class AlbumService {

	constructor(private http: HttpClient) { }

  	getAll(): Observable<any> {
    	return this.http.get<Album[]>(baseUrl);
  	}

	/*
  	get(id): Observable<any> {
    	return this.http.get(`${baseUrl}/${id}`);
  	}

  	create(data): Observable<any> {
    	return this.http.post(baseUrl, data);
  	}

  	update(id, data): Observable<any> {
    	return this.http.put(`${baseUrl}/${id}`, data);
  	}

  	delete(id): Observable<any> {
    	return this.http.delete(`${baseUrl}/${id}`);
  	}

  	deleteAll(): Observable<any> {
    	return this.http.delete(baseUrl);
  	}

  	findByTitle(title): Observable<any> {
    	return this.http.get(`${baseUrl}?title=${title}`);
	}
	*/
}
