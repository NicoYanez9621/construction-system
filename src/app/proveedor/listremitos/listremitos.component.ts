import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ProveedorService, RemitoAlCliente } from 'src/app/proveedor.service';
import { RemitoQrDialogComponent } from '../remito-qr-dialog/remito-qr-dialog.component';

@Component({
  selector: 'app-listremitos',
  templateUrl: './listremitos.component.html',
  styleUrls: ['./listremitos.component.css']
})
export class ListRemitosComponent implements OnInit{

  loading: boolean = false;
  dataSource = new MatTableDataSource<RemitoAlCliente>();
  constructor(private _proveedorServicio: ProveedorService, private snackBar: MatSnackBar, private _dialog: MatDialog) { }

  displayedColumns: string[] = ['qr','fechaEmision', 'nombre', 'cuit' , 'mail'];

  searchInput = new FormControl('');

  ngOnInit() {
    this.loading = true;
    this.dataSource = new MatTableDataSource<RemitoAlCliente>([]);
    this._proveedorServicio.getRemitosAlCliente().subscribe((remitos) => {
      this.loading = false;
      this.dataSource.data = remitos;
    }, (error) => {
      this.loading = false;
      this.snackBar.open('Error al cargar remitos', 'OK', { duration: 3000 });
    });

    // this.searchInput.valueChanges.subscribe(value => {
    //   this.dataSource.filter = value
    // };

    // this.dataSource.filterPredicate = (data: RemitoAlCliente, filter: string) => {
    //   const searchString = filter.trim().toLowerCase();
    //   if(data){
    //     return data.fechaEmision?.includes(searchString) ||
    //            data.cliente.nombre.toLowerCase().includes(searchString) ||
    //            data.cliente.cuit.includes(searchString) ||
    //            data.cliente.mail.toLowerCase().includes(searchString);
    //   }
    // });
  }

  getRemitos(){
    this.loading = true;
    this._proveedorServicio.getRemitosAlCliente().subscribe((remitos) => {
      this.dataSource.data = remitos;
      this.loading = false;
    });
  }

  generateQR(remitoAlCliente: RemitoAlCliente){
    const dialogRef = this._dialog.open(RemitoQrDialogComponent, {
      data: {remito: remitoAlCliente},
    });
  }


}
