import { Component,OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';
import { AuthService } from '../../service/auth.service';
import { CarritoService } from '../../service/carrito.service';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit , OnDestroy {
  products: Product[];
  productoaeditar: Product;
  editable = false;
  tipo: string;
  filtro = false;
  productoscargados = false;
  suscribe: any;
  constructor(public productsService: ProductsService,
              public authService: AuthService,
              public carritoService: CarritoService,
              private route: ActivatedRoute,
             ) {
             }

  
    ngOnInit() {
    this.productsService.getProducts().subscribe((productsSnapshot) => {
      this.products = [];
      productsSnapshot.forEach((catData: any) => {
        this.products.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });
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
  agregarAlCarrito(p){
    this.carritoService.addProductoCarrito(p);

  }

  filterseleccion(data){
    this.filtro = true;
    this.tipo = data;
  }
  todos(){
    this.filtro = false;
  }

 }
