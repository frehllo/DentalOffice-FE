import { Injectable } from '@angular/core';
import * as config from './jsons/fields-example.json'

@Injectable({
  providedIn: 'root'
})
export class ModuleserviceService {

  constructor() { }

  getById(id : any) : any {
    return config;
  }
}
