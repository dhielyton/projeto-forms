import { ConsultarCepService } from './../shared/services/consultar-cep.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DropDownService } from '../shared/services/drop-down.service';
import { EstadoBr } from '../shared/models/estadobr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  //estados: EstadoBr[];
  estados:Observable<EstadoBr[]>;
  cargos:any[];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropDownService,
    private cepService: ConsultarCepService) { }

  ngOnInit() {
    this.estados = this.dropDownService.getEstadoBr();
    this.cargos = this.dropDownService.getCargos();
    // this.formulario = new FormGroup({
    //   nome:new FormControl(null),
    //   email:new FormControl(null)
    // })
    // this.dropDownService.getEstadoBr()
    //   .subscribe((dados) => {
    //     this.estados = dados;
    //     console.log(dados);
    //   })
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo:[null]

    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
        .subscribe(dados => {
          console.log(dados);
          this.formulario.reset();
        },
          (erro: any) => alert('error'));
    } else {
      console.log('formulário inválido');
      this.verifcarValidacoesForm(this.formulario)
    }

  }

  verifcarValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(
      campo => {
        console.log(campo);
        const controle = this.formulario.get(campo);
        if (controle != null) {
          controle.markAsTouched();
        }

        if (controle instanceof FormGroup) {
          this.verifcarValidacoesForm(controle)
        }
      }
    );
  }
  resetar() {
    this.formulario.reset();
  }

  verificaValidTouched(nome: string) {
    let campo = this.formulario.get(nome);
    return (!campo.valid) && (campo.touched);
  }
  verificaEmailInvalido() {
    var campo = this.formulario.get('email');
    if (campo.errors) {
      return campo.errors['email'] && campo.touched;
    }
  }

  aplicaCssErro(nome: string) {

    return {
      'has-erro': this.verificaValidTouched(nome),
      'has-feedback': this.verificaValidTouched(nome)
    }

  }
  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    if(cep!= null && cep !==''){
      this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados));
    }
    
  }

  populaDadosForm(dados) {

    this.formulario.patchValue(
      {
        endereco: {
          rua: dados.logradouro,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      }
    );
  }

  resetarDadosForm() {
    this.formulario.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }
  setarCargo(){
    const cargo  = {nome:'Dev', nivel:'Pleno', desc:'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }
  compararCargos(obj1, obj2){
    return obj1 && obj2? (obj1.nome=== obj2.nome)&&(obj1.nivel=== obj2.nivel):obj1 && obj2;
  }

}
