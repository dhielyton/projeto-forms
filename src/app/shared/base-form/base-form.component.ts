import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-base-form'
})
export abstract class BaseFormComponent implements OnInit {

  formulario:FormGroup;

  constructor() { }

  ngOnInit() {
  }
  abstract submit();
  onSubmit(){
    if(this.formulario.valid){
      this.submit();
    }
  }

  verifcarValidacoesForm(formGroup: FormGroup| FormArray) {
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
  aplicaCssErro(nome: string) {

    return {
      'has-erro': this.verificaValidTouched(nome),
      'has-feedback': this.verificaValidTouched(nome)
    }

  }

}
