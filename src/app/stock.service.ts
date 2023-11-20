import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Remito {
  proveedorId?:  number;
  proveedor?:    string;
  fechaEmision: Date;
  items?:        Item[];
  createdAt?:    Date;
  updatedAt?:    Date;
}

export interface Item {
  productoId?: number;
  id?:          number;
  descripcion?: string;
  cantidad?:   number;
  unidad?:     string;
}

export interface Producto {
  id?:          number;
  descripcion: string;
  stock?:       number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Proveedor {
  id?:        number;
  nombre:    string;
  cuit?:      string;
  domicilio?: string;
  mail?:      string;
  telefono?:  string;
  createdAt?: Date;
  updatedAt?: Date;
}


@Injectable({
  providedIn: 'root'
})
export class StockService {

  remitosSubjet = new BehaviorSubject<Remito[]>([] as Remito[]);
  remitos$ = this.remitosSubjet.asObservable();

  proveedoresSubjet = new BehaviorSubject<Proveedor[]>([] as Proveedor[]);
  proveedores$ = this.proveedoresSubjet.asObservable();

  productosSubjet = new BehaviorSubject<Producto[]>([] as Producto[]);
  productos$ = this.productosSubjet.asObservable();

  BASE_URL = 'https://servicetickets.onrender.com/api/empresa';
  constructor(private _httpClient: HttpClient) {
    this.getProveedores();
    this.getProductos();
  }

  guardarRemito(body: any) {
    const remitos = this.remitosSubjet.getValue();
    const endpoint = `${this.BASE_URL}/remitos`;
    return this._httpClient.post(endpoint, body)
  }

  getRemitos() {
    return this.remitosSubjet.getValue();
  }

  getProveedores() {
    const endpoint = `${this.BASE_URL}/proveedores`;
    this._httpClient.get<Proveedor[]>(endpoint).subscribe(proveedores => {
      this.proveedoresSubjet.next(proveedores);
    });
  }

  getProductos() {
    const endpoint = `${this.BASE_URL}/productos`;
    this._httpClient.get<Producto[]>(endpoint).subscribe(productos => {
      this.productosSubjet.next(productos);
    });
  }

  nuevoProducto(body: any) {
    const endpoint = `${this.BASE_URL}/productos`;
    return this._httpClient.post(endpoint, body);
  }

  nuevoProveedor(body: any) {
    const endpoint = `${this.BASE_URL}/proveedores`;
    return this._httpClient.post(endpoint, body);
  }


}

