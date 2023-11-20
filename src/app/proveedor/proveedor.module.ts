import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ProveedorAppComponent } from './proveedor-app/proveedor-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { EmisionRemitoFormComponent } from './emision-remito-form/emision-remito-form.component';
import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { ListRemitosComponent } from './listremitos/listremitos.component';
import { RemitoQrDialogComponent } from './remito-qr-dialog/remito-qr-dialog.component';


@NgModule({
  declarations: [
    ProveedorAppComponent,
    EmisionRemitoFormComponent,
    ListRemitosComponent,
    RemitoQrDialogComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    QRCodeModule
  ]
})
export class ProveedorModule { }
