import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Proveedor, StockService } from 'src/app/stock.service';

@Component({
  selector: 'app-abm-proveedores',
  templateUrl: './abm-proveedores.component.html',
  styleUrls: ['./abm-proveedores.component.css']
})
export class AbmProveedoresComponent {

  loading: boolean = false;
  displayedColumns: string[] = ['id', 'nombre', 'cuit', 'domicilio', 'mail', 'telefono'];
  proveedores!: Proveedor[];
  dataSource = new MatTableDataSource<Proveedor>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  form!: FormGroup;
  constructor(private _fbuilder: FormBuilder, private stockService: StockService, private snackBar: MatSnackBar) {
    this.form = this._fbuilder.group({
      nombre: ['', Validators.required],
      cuit: ['', Validators.required],
      domicilio: ['', Validators.required],
      mail: ['', Validators.required],
      telefono: ['', Validators.required]
    });

  }

  ngOnInit() {
    this.stockService.proveedores$.subscribe((proveedores) => {
      this.proveedores = proveedores;
      this.dataSource.data = proveedores;
    });
  }

  nuevoProveedor() {
    if(!this.form.controls["nombre"].value || !this.form.controls["cuit"].value || !this.form.controls["domicilio"].value || !this.form.controls["mail"].value || !this.form.controls["telefono"].value) {
      this.snackBar.open('Complete los campos', 'OK', { duration: 3000 });
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.stockService.nuevoProveedor(this.form.value).subscribe((proveedor) => {
      this.loading = false;
      this.form.reset();
      this.snackBar.open('Proveedor creado', 'OK', { duration: 3000 });
      this.stockService.getProveedores();
      this.form.reset();
    }, (error) => {
      this.loading = false;
      this.snackBar.open('Error al crear proveedor', 'OK', { duration: 3000 });
    });
  }

  refresh(){
    this.loading = true;
    this.stockService.getProveedores();
    this.loading = false;
  }

}
