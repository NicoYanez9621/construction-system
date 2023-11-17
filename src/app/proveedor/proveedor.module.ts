import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorAppComponent } from './proveedor-app/proveedor-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EmisionRemitoFormComponent } from './emision-remito-form/emision-remito-form.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProveedorAppComponent,
    EmisionRemitoFormComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class ProveedorModule { }
