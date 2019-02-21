import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstadoBr } from '../models/estadobr';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  getEstadoBr() {
    return this.http.get<EstadoBr[]>('assets/dados/estados.json')
  }
  constructor(private http: HttpClient) { }
}
