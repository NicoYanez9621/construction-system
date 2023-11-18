import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAppComponent } from './main-app/main-app.component';
import { AltaRemitoFormComponent } from './alta-remito-form/alta-remito-form.component';
import { StockViewComponent } from './stock-view/stock-view.component';
import { AbmProveedoresComponent } from './abm-proveedores/abm-proveedores.component';
import { AbmProductosComponent } from './abm-productos/abm-productos.component';

const routes: Routes = [
  { path: '', component: MainAppComponent ,
    children: [
      { path: 'alta-remito', component: AltaRemitoFormComponent },
      { path: 'proveedores', component: AbmProveedoresComponent },
      { path: 'productos', component: AbmProductosComponent },
      { path: 'stock', component: StockViewComponent },
      { path: '', redirectTo: '/alta-remito', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
