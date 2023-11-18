import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedorAppComponent } from './proveedor-app/proveedor-app.component';
import { EmisionRemitoFormComponent } from './emision-remito-form/emision-remito-form.component';

const routes: Routes = [
  { path: '', component: ProveedorAppComponent ,
  children: [
    { path: 'crear-remito', component: EmisionRemitoFormComponent },
    { path: '', redirectTo: '/crear-remito', pathMatch: 'full' },
  ]},
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
