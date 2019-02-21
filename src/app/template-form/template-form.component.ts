import { ConsultarCepService } from './../shared/services/consultar-cep.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario:any= {
    nome :null,
    email :null
  };
  onSubmit(form){
   
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
    .subscribe( dados => console.log(dados));
  }
  constructor(private http:HttpClient,
    private cepService:ConsultarCepService) { }

  ngOnInit() {
  }
  verificaValidTouched(campo){
    return (!campo.valid) && (campo.touched);
  }

  aplicaCssErro(campo){
   
    return{
      'has-erro': this.verificaValidTouched(campo),
      'has-feedback':this.verificaValidTouched(campo)
      
      
    }
    
  }
  consultaCEP(cep, form){
    
    var cep = cep.replace(/\D/g,'');
    if(cep != null){
      var validaCep = /^[0-9]{8}$/;;
      if(validaCep.test(cep)){
          this.resetarDadosForm(form);
          this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe( dados  =>  this.populaDadosForm(dados, form));
          
      }
    }
  }

  populaDadosForm(dados, formulario){
   console.log(dados);
    formulario.form.patchValue(
      {
        endereco:{
          rua: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade:dados.localidade,
          estado:dados.uf
        }
      }
    );
  }
  resetarDadosForm(formulario){
    formulario.form.patchValue({
      endereco:{
        rua: null,
        complemento: null,
        bairro: null,
        cidade:null,
        estado:null
      }
    });
  }

}
