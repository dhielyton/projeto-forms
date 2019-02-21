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
  getTecnologias(){
    return [
      {nome:'java', desc:'Java'},
      {nome:'javaScript', desc:'JavaScript'},
      {nome:'php', desc:'PHP'},
      {nome:'ruby', desc:'Ruby'},
      {nome:'typeScript', desc:'TypeScript'},
      {nome:'cSharp', desc:'C#'}
    ]
  }
  getNewsletter(){
    return [
      {valor:'s', desc:'Sim'},
      {valor:'n', desc:'Não'}
    ]
  }
  constructor(private http: HttpClient) { }
}
