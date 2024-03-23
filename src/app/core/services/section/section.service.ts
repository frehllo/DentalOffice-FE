import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../service-constants';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http : HttpClient) { }

  getList() {
    return this.http.get(API_URL + "/section");
  }

  getByRoute(route : string) {
    return this.http.get(API_URL + "/section" + route);
  }

  getAllData(apiString : string) {
    return this.http.get(API_URL + '/section/data' + apiString);
  }

  getSingleData(apiString : string, id : any) {
    return this.http.get(API_URL + apiString + '/' + id);
  }

  insertData(apiString : string, data : any) {
    return this.http.post(API_URL + '/section/data' + apiString, data);
  }

  updateData(apiString : string, data : any) {
    return this.http.put(API_URL + '/section/data' + apiString + '/' + data["id"], data);
  }

  deleteData(apiString : string, id : any) {
    return this.http.delete(API_URL + '/section/data' + apiString + '/' + id);
  }
}
