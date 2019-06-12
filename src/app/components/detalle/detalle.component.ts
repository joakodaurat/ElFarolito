import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
 
  products: Product[];
 
  id_parametro : string;
  constructor( public productsService: ProductsService,private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
   this.id_parametro = this.rutaActiva.snapshot.params.id;

   this.productsService.getProducts().subscribe(products => {
    this.products = products;
   
         });
  

}
}
