import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private http:HttpClient) { }

  ngOnInit() {
    // this.formulario = new FormGroup({
    //   nome:new FormControl(null),
    //   email:new FormControl(null)
    // })
    this.formulario = this.formBuilder.group({
      nome:[null, Validators.required],
      email:[null,[Validators.required, Validators.email]],
      endereco:this.formBuilder.group({
        cep:[null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
     
    });
  }

  onSubmit(){
    if(this.formulario.valid){
      console.log(this.formulario.value);
      this.http.post('https://oooohttpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe( dados => {console.log(dados);
        this.formulario.reset();
      },
      (erro:any)=> alert('error'));
    }else{
      console.log('formulário inválido');
      this.verifcarValidacoesForm(this.formulario)
    }
    
  }

  verifcarValidacoesForm(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(
      campo =>{
        console.log(campo);
        const controle = this.formulario.get(campo);
        if(controle!= null){
          controle.markAsTouched();
        }
        
        if(controle instanceof FormGroup){
          this.verifcarValidacoesForm(controle)
        }
      }
    );
  }
  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(nome:string){
    let campo = this.formulario.get(nome);
    return (!campo.valid) && (campo.touched);
  }
  verificaEmailInvalido(){
    var campo = this.formulario.get('email');
    if(campo.errors){
      return campo.errors['email'] && campo.touched;
    }
  }

  aplicaCssErro(nome:string){
   
    return{
      'has-erro': this.verificaValidTouched(nome),
      'has-feedback':this.verificaValidTouched(nome)
    }
    
  }
  consultaCEP(){
    let cep = this.formulario.get('endereco.cep').value;
    cep = cep.replace(/\D/g,'');
    if(cep != null){
      var validaCep = /^[0-9]{8}$/;;
      if(validaCep.test(cep)){
          this.resetarDadosForm();
          this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .subscribe( dados  =>  this.populaDadosForm(dados));
          
      }
    }
  }

  populaDadosForm(dados){
   
    this.formulario.patchValue(
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

  resetarDadosForm(){
    this.formulario.patchValue({
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
