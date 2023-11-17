import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Producto, StockService } from 'src/app/stock.service';

@Component({
  selector: 'app-abm-productos',
  templateUrl: './abm-productos.component.html',
  styleUrls: ['./abm-productos.component.css']
})
export class AbmProductosComponent implements OnInit, AfterViewInit {

  loading: boolean = false;
  form: FormGroup;
  displayedColumns: string[] = ['id', 'descripcion', 'stock'];
  productos!: Producto[];
  dataSource = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private _fbuilder: FormBuilder, private stockService: StockService, private snackBar: MatSnackBar) {
    this.form = this._fbuilder.group({
      descripcion: [''],
      stock: [''],
    });
  }

  ngOnInit() {
    this.form = this._fbuilder.group({
      descripcion: [''],
      stock: [''],
    });
    this.stockService.productos$.subscribe((productos) => {
      this.productos = productos;
      this.dataSource.data = productos;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = [];
  }


  nuevoProducto() {
    if(!this.form.controls["descripcion"].value || !this.form.controls["stock"].value) {
      this.snackBar.open('Complete los campos', 'OK', { duration: 3000 });
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.stockService.nuevoProducto(this.form.value).subscribe((producto) => {
      this.loading = false;
      this.form.reset();
      this.snackBar.open('Producto creado', 'OK', { duration: 3000 });
      this.stockService.getProductos();
      this.form.reset();
    }, (error) => {
      this.loading = false;
      this.snackBar.open('Error al crear producto', 'OK', { duration: 3000 });
    });

    this.snackBar.open('Producto creado', 'OK', { duration: 3000 });
  }

  refresh(){
    this.loading = true;
    this.stockService.getProductos();
    this.loading = false;
  }
}
