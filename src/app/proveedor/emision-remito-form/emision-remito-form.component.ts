import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, map, startWith } from 'rxjs';
import { Item, Producto, Proveedor, StockService } from 'src/app/stock.service';

@Component({
  selector: 'app-emision-remito-form',
  templateUrl: './emision-remito-form.component.html',
  styleUrls: ['./emision-remito-form.component.css']
})
export class EmisionRemitoFormComponent implements OnInit {

  title = 'qr-reader';
  public cameras:MediaDeviceInfo[]=[];
  public myDevice!: MediaDeviceInfo;
  public scannerEnabled=false;
  public results:string[]=[];
  options: string[] = ['One', 'Two', 'Three'];
  _proveedores: Proveedor[] = [];
  proveedores$: Observable<Proveedor[]>;
  proveedoresFiltrados!: Observable<Proveedor[]>;
  productos$: Observable<Producto[]>;
  _productos: Producto[] = [];
  productosFiltrados!: Observable<Producto[]>;
  productoSeleccionado!: Producto | null;
  unidades: string[] = ['Kg', 'Ltr', 'U', 'Mts'];
  itemsCargados: Item[] = [];
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private fb: FormBuilder, private stockService: StockService, private snackBar: MatSnackBar) {
    this.proveedores$ = this.stockService.proveedores$;
    this.productos$ = this.stockService.productos$;
  }

  form = this.fb.group({
    proveedor: ['', Validators.required],
    fecha: ['', Validators.required],
    cuitProveedor: ['', Validators.required],
    telefono: ['', Validators.required],
    cantidad: ['', Validators.required],
    id: ['', Validators.required],
    unidad: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  displayedColumns: string[] = ['id', 'descripcion', 'cantidad', 'unidad'];
  dataSource = new MatTableDataSource<Item>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = [];
  }

  ngOnInit() {

    this.stockService.proveedores$.subscribe((proveedores) => {
      this._proveedores = proveedores;
    });

    this.stockService.productos$.subscribe((productos) => {
      this._productos = productos;
    });

    this.proveedoresFiltrados = this.form.controls.proveedor.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const lowerCase = value?.toLowerCase() || '';
        return this._proveedores.filter((option) => option.nombre.toLowerCase().includes(lowerCase));
      }),
    );

    this.productosFiltrados = this.form.controls.id.valueChanges.pipe(
      startWith(''),
      map((value) => {
        const lowerCase = value?.toLowerCase() || '';
        const filtered = this._productos.filter((option) => option.descripcion.toLowerCase().includes(lowerCase));
        return filtered;
      }),
    );
  }

  productoSeleccionadoFn(event: any) {
    // this.form.controls.id.setValue(event.option.value.id);
    const productId = event.option.value
    const result = this._productos.find((p) => p.id === productId) || null;
    this.productoSeleccionado = result? result : null;
    this.form.controls.descripcion.setValue(this.productoSeleccionado?.descripcion || null);
  }

  displayFnProd(i: Item): string {
    return i && i.descripcion ? i.descripcion : '';
  }

  addItem() {
    const items = this.dataSource.data;
    // Verify if fields are incompleted
    if(!this.form.controls.id?.value || !this.form.controls.cantidad?.value || !this.form.controls.descripcion?.value){
      this.snackBar.open('Debe completar todos los campos', 'Cerrar', {duration: 3000});
      this.form.markAllAsTouched();
      return;
    }
    const item:Item = {
      id: Number(this.form.controls.id?.value),
      cantidad: Number(this.form.controls.cantidad?.value),
      unidad: this.form.controls.unidad?.value || '',
      descripcion: this.form.controls.descripcion?.value || '',
    };
    items.push(item);
    this.dataSource.data = items;
    this.itemsCargados = items;
    this.form.controls.id.setValue('');
    this.form.controls.cantidad.setValue('');
    this.form.controls.unidad.setValue('');
    this.form.controls.descripcion.setValue('');
  }

  guardarRemito() {
    if(!this.form.controls.proveedor?.value || !this.form.controls.fecha?.value || !this.form.controls.cuitProveedor?.value || !this.form.controls.telefono?.value){
      this.snackBar.open('Debe completar todos los campos de la cabecera', 'Cerrar', {duration: 3000});
      this.form.markAllAsTouched();
      return;
    }
    if(!this.itemsCargados.length){
      this.snackBar.open('Debe cargar al menos un item', 'Cerrar', {duration: 3000});
      return;
    }
    this.loading = true;
    const body = {
      proveedorId: this.form.controls.proveedor.value,
      fechaEmision: new Date(this.form?.controls?.fecha.value).toISOString(),
      items: this.itemsCargados.map((i) => {
        return {
          productoId: i.id,
          cantidad: i.cantidad,
          unidad: i.unidad,
        };
      })
     };

     this.stockService.guardarRemito(body).subscribe((res) => {
        this.snackBar.open('Remito guardado', 'Cerrar', {duration: 3000});
        this.limpiarForm();
        this.loading = false;
        this.dataSource.data = [];
        this.itemsCargados = [];
        this.form.reset();
      }, (err) => {
        this.loading = false;
        console.log(err)
        this.snackBar.open('Error al guardar remito', 'Cerrar', {duration: 3000});
      })
  }

  scanQR() {
    this.snackBar.open('Escaneando QR', 'Cerrar', {duration: 3000});

  }

  limpiarForm(){
    this.form.reset();
  }

}

