import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface RemitoAlCliente {
  id:           number;
  fechaEmision: Date;
  createdAt:    Date;
  updatedAt:    Date;
  cuitEmisor: string;
  productos:    Producto[];
  cliente:      Cliente;
}

export interface Cliente {
  clienteId?: number;
  nombre?:    string;
  cuit?:      string;
  domicilio?: string;
  mail?:      string;
  telefono?:  string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Producto {
  id?:          number;
  descripcion?: string;
  stock?:       number;
  createdAt?:   Date;
  updatedAt?:   Date;
  item?:        Item;
}

export interface Item {
  cantidad?: number;
  unidad?:   string;
}


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
BASE_URL: string = 'https://servicetickets.onrender.com/api';
constructor(private httpClient: HttpClient) {

}

getRemitosAlCliente() {
  return this.httpClient.get<RemitoAlCliente[]>(`${this.BASE_URL}/proveedor/remitos`);
}

}
