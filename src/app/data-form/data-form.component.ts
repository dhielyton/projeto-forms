import { VerificaEmailService } from './services/verifica-email.service';
import { FormValidation } from './../shared/form-validation';
import { map } from 'rxjs/operators';
import { ConsultarCepService } from './../shared/services/consultar-cep.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DropDownService } from '../shared/services/drop-down.service';
import { EstadoBr } from '../shared/models/estadobr';
import { Observable } from 'rxjs';
import { ValueTransformer } from '@angular/compiler/src/util';
import { BaseFormComponent } from '../shared/base-form/base-form.component';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent extends BaseFormComponent implements OnInit {


  //formulario: FormGroup;
  //estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworks = ['Angular', 'React', 'Vue', 'Sancha'];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropDownService,
    private cepService: ConsultarCepService,
    private verificaEmailService: VerificaEmailService) {
    super();
  }

  ngOnInit() {

    this.estados = this.dropDownService.getEstadoBr();
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();
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
      nome: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], [this.verificarEmail.bind(this)]],
      confirmarEmail: [null, [FormValidation.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, Validators.required, FormValidation.cepValidation],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()

    });

  }
  buildFrameworks() {
    const values = this.frameworks.map(x => new FormControl(false));
    return this.formBuilder.array(values);
    // return [
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false),
    //   new FormControl(false)
    // ]
  }
  submit() {
    let valueSubmit = Object.assign({}, this.formulario.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map(
        (v, i) => v ? this.frameworks[i] : null
      ).filter(v => v !== null)
    });

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit))
      .subscribe(dados => {
        console.log(dados);
        this.formulario.reset();
      },
        (erro: any) => alert('error'));


  }

  requiredMinCheckbox(min = 1) {
    const validation = (formArray: FormArray) => {
      // const values = formArray.controls;
      // let totalChecked = 0;
      // for(let i = 0; i < values.length; i++){
      //   if(values[i].value){
      //     totalChecked++;
      //   }
      // }
      const totalChecked = formArray.controls
        .map(v => v.value).reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true }
    }
  }

  

  
  verificaEmailInvalido() {
    var campo = this.formulario.get('email');
    if (campo.errors) {
      return campo.errors['email'] && campo.touched;
    }
  }

  
  consultaCEP() {
    let cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
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
  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }
  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome) && (obj1.nivel === obj2.nivel) : obj1 && obj2;
  }
  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['cSharp', 'typeScript']);
  }
  verificarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(map(emailExiste => emailExiste ? { emailInvalido: true } : null));
  }

}
