import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'proveedor', loadChildren: () => import('./proveedor/proveedor-routing.module').then(m => m.ProveedorRoutingModule) },
  { path: '', loadChildren: () => import('./main/main-routing.module').then(m => m.MainRoutingModule) },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
