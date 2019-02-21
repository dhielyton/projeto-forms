import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropDownService } from './services/drop-down.service';
import { HttpClientModule } from '@angular/common/http';
import { ErroMsgComponent } from './erro-msg/erro-msg.component';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent,
    ErroMsgComponent,
    
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent,
    ErroMsgComponent
  ],
  providers:[DropDownService]

  
})
export class SharedModule { }
