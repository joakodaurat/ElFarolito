import { Injectable } from '@angular/core';
import { ProductoCarrito } from '../models/productoCarrito';
import { templateJitUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  ProductosCarrito: ProductoCarrito[];

  constructor() {
    this.ProductosCarrito = [];
   }

  getProductosCarrito() {
    if (localStorage.getItem('ProductosCarrito') === null) {
      return this.ProductosCarrito;
    } else {
      this.ProductosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));
      return this.ProductosCarrito;
    }
  }

  addProductoCarrito( productoCarrito: ProductoCarrito ) {
    this.ProductosCarrito.push(productoCarrito);
    let ProductosCarrito: ProductoCarrito[] = [];
    if (localStorage.getItem('ProductosCarrito') === null) {
      ProductosCarrito.push(productoCarrito);
      localStorage.setItem('ProductosCarrito', JSON.stringify(ProductosCarrito));
    } else {
          ProductosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));
          ProductosCarrito.push(productoCarrito);
          localStorage.setItem('ProductosCarrito', JSON.stringify(ProductosCarrito));
          }
   }

   deleteProductoCarrito (productoCarrito: ProductoCarrito){
     for (let i = 0; i < this.ProductosCarrito.length; i++ ) {
        if (productoCarrito == this.ProductosCarrito[i]){
          this.ProductosCarrito.splice(i,1);
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
        }
     }

   }

}


