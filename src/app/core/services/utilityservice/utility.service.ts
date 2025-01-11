import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { API_URL } from '../service-constants';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private http: HttpClient) { }

  checkServerStatus(): Observable<any> {
    return this.http.get(API_URL + "/utility")
      .pipe(
        retry(3),
        catchError(() => {
          console.log("Server down!")
          return new Observable(observer => observer.next(false));
        })
      );
  }
}
