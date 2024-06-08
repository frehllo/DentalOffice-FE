import { Injectable } from '@angular/core';
import { API_URL } from '../service-constants';
import { HttpClient } from '@angular/common/http';
import { DocumentConfig } from '../../components/standalones/modals/module-preview-modal/module-preview-modal.component';
import { Observable } from 'rxjs';

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

  getLotsByMaterialId(id : number) {
    return this.http.get(API_URL + "/module/lots/" + id);
  }

  getLotsByMaterialIdAndColorId(id : number, colorId : number) {
    return this.http.get(API_URL + "/module/lots/" + id + "/color/" + colorId);
  }

  removeProcess(id : number) {
    return this.http.delete(API_URL + "/module/process/" + id);
  }

  addProcess(model : any) {
    return this.http.post(API_URL + "/module/process", model);
  }

  updateProcess(id : number, model : any) {
    return this.http.put(API_URL + "/module/process/" + id, model);
  }

  getDocumentsPrintPreviews(id : number) : Observable<any[]> {
    return this.http.get<any[]>(API_URL + "/module/documents/" + id);
  }
}