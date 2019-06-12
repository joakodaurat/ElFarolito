import { Injectable } from '@angular/core';
import { ProductoCarrito } from '../models/productoCarrito';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  ProductosCarrito: ProductoCarrito[];
  // subject es el generador de eventos
  private ProductosCarrito$ = new Subject<ProductoCarrito[]>();
  constructor() {
    this.ProductosCarrito = [];
    this.ProductosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));

   }

  getProductosCarrito() {
    if (localStorage.getItem('ProductosCarrito') === null) {
      return this.ProductosCarrito;
    } else {
      this.ProductosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));
      return this.ProductosCarrito;
    }
  }
  
// devuelve el observable y lo mantiene conectado con otros componentes
   getProductosCarrito$(): Observable<ProductoCarrito[]> {
      return this.ProductosCarrito$.asObservable();
  }


  addProductoCarrito( productoCarrito: ProductoCarrito ) {
    let estaenelarreglo = false;
    if (this.ProductosCarrito.length === 0) {
      productoCarrito.cantidad = 1;
      this.ProductosCarrito.push(productoCarrito);
      this.ProductosCarrito$.next(this.ProductosCarrito);
       //lo guardo en el localstorage
      localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
    }else { 
      for (let i = 0; i < this.ProductosCarrito.length; i++ ) {
        if (productoCarrito.id === this.ProductosCarrito[i].id){
          estaenelarreglo = true;
          this.ProductosCarrito[i].cantidad = this.ProductosCarrito[i].cantidad + 1;
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
          this.ProductosCarrito$.next(this.ProductosCarrito);
        }
        }
      if (!estaenelarreglo) {
          productoCarrito.cantidad = 1;
          this.ProductosCarrito.push(productoCarrito);
          this.ProductosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));
          this.ProductosCarrito.push(productoCarrito);
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
        }
    }
     }

   deleteProductoCarrito(productoCarrito: ProductoCarrito){
     for (let i = 0; i < this.ProductosCarrito.length; i++ ) {
        if (productoCarrito.id == this.ProductosCarrito[i].id){
          this.ProductosCarrito.splice(i, 1);
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
        }
     }
   }
   actualizar(productoCarrito: ProductoCarrito){
    for (let i = 0; i < this.ProductosCarrito.length; i++ ) {
       if (productoCarrito.id === this.ProductosCarrito[i].id) {
         this.ProductosCarrito.splice(i, 1, productoCarrito);
         localStorage.setItem('ProductosCarrito', JSON.stringify(this.ProductosCarrito));
       }
    }
  }

}


