import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErroHandler implements ErrorHandler{

  constructor(private http : HttpClient) { }

  handleError(error: any): void {
    console.log('Error occured: ', error)
    throw new Error('Method not implemented.');
  }
}
