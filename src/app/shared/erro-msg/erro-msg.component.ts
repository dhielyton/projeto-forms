import { FormValidation } from './../form-validation';
import { CampoControlErroComponent } from './../campo-control-erro/campo-control-erro.component';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-erro-msg',
  templateUrl: './erro-msg.component.html',
  styleUrls: ['./erro-msg.component.css']
})
export class ErroMsgComponent implements OnInit {
  // @Input() mostrarErro:boolean;
  // @Input() msgErro:string;
  @Input() control:FormControl;
  @Input() label:string;
  constructor() { }

  ngOnInit() {
  }

  get erroMessage(){
    
    for( let propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName)
      && this.control.touched){
        //todo
        return FormValidation.getErroMsg(this.label,propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }

}
