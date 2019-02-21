import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultarCepService {

  constructor(private http:HttpClient) { }

  consultaCEP(cep:string) {
   
    cep = cep.replace(/\D/g, '');
    if (cep != null) {
      var validaCep = /^[0-9]{8}$/;;
      if (validaCep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json/`);
      }
    }
    return of({})
  }
}
