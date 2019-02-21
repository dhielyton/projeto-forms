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
  getCargos(){
    return [
      {nome:'Dev', nivel:'Junior', desc:'Dev Jr'},
      {nome:'Dev', nivel:'Pleno', desc:'Dev Pl'},
      {nome:'Dev', nivel:'Senior', desc:'Dev Sr'}
    ]
  }
  constructor(private http: HttpClient) { }
}
