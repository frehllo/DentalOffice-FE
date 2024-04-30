import { Injectable } from '@angular/core';
import { API_URL } from '../service-constants';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http : HttpClient) { }

  getConfiguration() : any {
    return this.http.get(API_URL + "/module/configuration");
  }

  getList() {
    return this.http.get(API_URL + "/module");
  }

  get(id : number) {
    return this.http.get(API_URL + "/module/" + id);
  }

  insert(module : any) {
    return this.http.post(API_URL + "/module", module);
  }

  update(id : number, module : any) {
    return this.http.put(API_URL + "/module/" + id, module);
  }
}
