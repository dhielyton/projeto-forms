import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateFormComponent } from './template-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TemplateFormComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
    
  ],
  exports:[
    TemplateFormComponent
  ]
})
export class TemplateFormModule { }
