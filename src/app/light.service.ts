import { Injectable } from '@angular/core';
import { Light } from './light';
import { Room } from './room';
import { Type } from './type';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class LightService {

  constructor(private http: HttpClient) { }

  appUrl = "http://localhost:1450/api/";

  getLights() {
    return this.http.get<Light[]>(`${this.appUrl}lights`);
  }

  getRooms() {
    return this.http.get<Room[]>(`${this.appUrl}rooms`);
  }

  getTypes() {
    return this.http.get<Type[]>(`${this.appUrl}types`);
  }

  deleteLight(id: number) {
    return this.http.delete<Light>(`${this.appUrl}lights/${id}`, httpOptions);
  }

  saveLight(light: Light): Observable<Light> {
    if (light.id) {
      return this.http.put<Light>(`${this.appUrl}lights/${light.id}`, light, httpOptions);
    }
    else {
      return this.http.post<Light>(`${this.appUrl}lights`, light, httpOptions);
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error);
      console.log(error.statusText);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
