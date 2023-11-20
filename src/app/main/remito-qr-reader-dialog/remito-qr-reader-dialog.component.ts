import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import jsQR from 'jsqr';
import { StockService } from 'src/app/stock.service';
@Component({
  selector: 'app-remito-qr-reader-dialog',
  templateUrl: './remito-qr-reader-dialog.component.html',
  styleUrls: ['./remito-qr-reader-dialog.component.css']
})
export class RemitoQrReaderDialogComponent implements AfterViewInit {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef;
  scannedCode!: string;
  video!: HTMLVideoElement;
  canvas!: HTMLCanvasElement;
  canvasContext!: CanvasRenderingContext2D | null;
  constructor(
    public dialogRef: MatDialogRef<RemitoQrReaderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private stockService: StockService,
    private snackBar: MatSnackBar,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    this.video = this.videoElement.nativeElement;
    this.canvas = this.canvasElement.nativeElement;
    this.canvasContext = this.canvas.getContext('2d');
    this.initCamera();
  }

  initCamera(): void {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.play();

        this.scanQRCode();
      })
      .catch((error) => console.error('Error al acceder a la cámara:', error));
  }

  scanQRCode(): void {
    requestAnimationFrame(() => this.scanQRCode());
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;
    if (this.canvasContext) {
      this.canvasContext?.drawImage(
        this.video,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const imageData = this.canvasContext?.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        this.scannedCode = code.data;
        const valid = this.stockService.getRemitoFromQRProveedor(this.scannedCode);
        if (valid) {
          this.dialogRef.close();
        }else{
          this.snackBar.open('QR inválido', 'Cerrar', { duration: 3000 });
          this.dialogRef.close();
        }
      }
    }
  }
}
