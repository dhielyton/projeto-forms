import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  getEstadoBr() {
    return this.http.get('assets/estadobr.json')
  }
  constructor(private http: HttpClient) { }
}
