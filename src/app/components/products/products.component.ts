import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';
import { AuthService } from '../../service/auth.service';
import { CarritoService } from '../../service/carrito.service';
import { ProductoCarrito } from '../../models/productoCarrito';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productosCarrito: ProductoCarrito[];
  products: Product[];
  productoaeditar: Product;
  editable: boolean = false;
  tipo: string;
  filtro = false;
  productoscargados = false;
  constructor(public productsService: ProductsService,
              public authService: AuthService,
              public carritoService: CarritoService,
             ) {
               }

  ngOnInit() {

           this.productsService.getProducts().subscribe(products => {
                    this.products = products;
                    this.productoscargados = true;
                         });
           this.productosCarrito = this.carritoService.getProductosCarrito();
  }

  deleteProduct( product: Product) {
    if (confirm('Seguro chamaco que queres eliminarlo?')) {
    this.productsService.deleteproduct(product);
  }
  }

  editProduct( event, product: Product) {
    this.productoaeditar = product;
    this.editable = !this.editable;
  }

  updateProduct(event, product: Product) {
    this.productsService.updateproduct(product);
    this.productoaeditar = {};
    this.editable = !this.editable;
  }
 
  filterseleccion(data){
    this.filtro=true;
    this.tipo = data;
  }
  todos(){
    this.filtro=false;
  }
  
  agregarAlCarrito(product: Product) {
    let productoCarrito: ProductoCarrito = {};
    productoCarrito.description = product.description;
    productoCarrito.id = product.id;
    productoCarrito.price = product.price;
    this.carritoService.addProductoCarrito(productoCarrito);

  }
  sacarDelCarrito( productoCarrito: ProductoCarrito) {
    if (confirm('Sacarlo del carrito?')) {
    this.carritoService.deleteProductoCarrito(productoCarrito);
  }
  }

}
