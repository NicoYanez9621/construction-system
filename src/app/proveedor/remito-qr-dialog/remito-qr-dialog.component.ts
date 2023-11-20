import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RemitoAlCliente } from 'src/app/proveedor.service';

export interface RemitoQrDialogData {
  remito: RemitoAlCliente;
}

@Component({
  selector: 'app-remito-qr-dialog',
  templateUrl: './remito-qr-dialog.component.html',
  styleUrls: ['./remito-qr-dialog.component.css']
})
export class RemitoQrDialogComponent implements OnInit{
  QRText : string = '';
  loading: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<RemitoQrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RemitoQrDialogData,
  ) {
    this.QRText = JSON.stringify(this.data.remito);
    console.log(this.QRText)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.loading = true;
    this.QRText = JSON.stringify(this.data.remito);
    console.log(this.QRText)
    this.loading = false;
  }

}
