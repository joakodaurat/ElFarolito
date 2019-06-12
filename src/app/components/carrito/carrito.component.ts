import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../../service/carrito.service';
import { ProductoCarrito } from '../../models/productoCarrito';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosCarrito: ProductoCarrito[];
  ProductosCarrito$: Observable<ProductoCarrito[]>;

  constructor( public carritoService: CarritoService) { }

  ngOnInit() {
   this.productosCarrito = this.carritoService.getProductosCarrito();
   // guardamos en el observable y cargamos cada vez que hay un cambio
   this.ProductosCarrito$ = this.carritoService.getProductosCarrito$();
   this.ProductosCarrito$.subscribe(x => this.cargar(x));
  }
  cargar(x){
    this.productosCarrito = x;
  };
  agregarAlCarrito(product: Product) {
    const productoCarrito: ProductoCarrito = {};
    productoCarrito.description = product.description;
    productoCarrito.id = product.id;
    productoCarrito.price = product.price;
    this.addProductoCarrito(productoCarrito);

  }
  sacarDelCarrito( productoCarrito: ProductoCarrito) {
    if (confirm('Sacarlo del carrito?')) {
    for (let i = 0; i < this.productosCarrito.length; i++ ) {
      if (productoCarrito.id == this.productosCarrito[i].id){
        this.productosCarrito.splice(i, 1);
        localStorage.setItem('ProductosCarrito', JSON.stringify(this.productosCarrito));
      }
   }
  }
  }

  sumarCantidad(productoCarrito: ProductoCarrito){
    productoCarrito.cantidad = productoCarrito.cantidad + 1;
    this.actualizar(productoCarrito);
  }
  restarCantidad(productoCarrito: ProductoCarrito){
    productoCarrito.cantidad = productoCarrito.cantidad - 1;
    this.actualizar(productoCarrito);
  }

  actualizar(productoCarrito: ProductoCarrito){
    for (let i = 0; i < this.productosCarrito.length; i++ ) {
       if (productoCarrito.id === this.productosCarrito[i].id) {
         this.productosCarrito.splice(i, 1, productoCarrito);
         localStorage.setItem('ProductosCarrito', JSON.stringify(this.productosCarrito));
       }
    }
  }

  addProductoCarrito( productoCarrito: ProductoCarrito ) {
    let estaenelarreglo = false;
    if (this.productosCarrito.length === 0) {
      this.productosCarrito.push(productoCarrito);
      localStorage.setItem('ProductosCarrito', JSON.stringify(this.productosCarrito));
    }else { 
      for (let i = 0; i < this.productosCarrito.length; i++ ) {
        if (productoCarrito.id === this.productosCarrito[i].id){
          estaenelarreglo = true;
          this.productosCarrito[i].cantidad = this.productosCarrito[i].cantidad + 1;
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.productosCarrito));
        }
        }
      if (!estaenelarreglo) {
          productoCarrito.cantidad = 1;
          this.productosCarrito.push(productoCarrito);
          this.productosCarrito = JSON.parse(localStorage.getItem('ProductosCarrito'));
          this.productosCarrito.push(productoCarrito);
          localStorage.setItem('ProductosCarrito', JSON.stringify(this.productosCarrito));
        }
    }
     }



}
