import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';
import { AuthService } from  '../../service/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products = [];
  productoaeditar: Product;
  editable: boolean = false;
  tipo: string;
  filtro=false;

  constructor(public productsService: ProductsService, private authService: AuthService) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(products => {
      //console.log(products);
      this.products = products;
    });
  }

  deleteProduct( event , product: Product) {
    console.log(event);
    this.productsService.deleteproduct(product);

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
  

}
