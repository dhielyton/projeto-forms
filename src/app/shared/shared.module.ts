import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { DropDownService } from './services/drop-down.service';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    FormDebugComponent,
    CampoControlErroComponent
  ],
  imports: [
    CommonModule,
    HttpClient
  ],
  exports:[
    FormDebugComponent,
    CampoControlErroComponent,
    DropDownService
  ],
  providers:[DropDownService]

  
})
export class SharedModule { }
