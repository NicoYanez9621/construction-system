import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainAppComponent } from './main-app/main-app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AltaRemitoFormComponent } from './alta-remito-form/alta-remito-form.component';
import { StockViewComponent } from './stock-view/stock-view.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MainAppComponent,
    AltaRemitoFormComponent,
    StockViewComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
})
export class MainModule { }
