import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { Product } from '../../models/product';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {} as Product;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  filepath: string;
  mostrarejemplo=true;

  constructor(public productsService: ProductsService, public storage: AngularFireStorage ) { }
  // en el html oculte un input con id=imageuser y tiene la data async de la imagen subida
  // la unica forma de ver el url de la imagen subida, ya que es un observable
  @ViewChild('imageuser') inputimagen: ElementRef;

  ngOnInit() {
  }

  addproduct() {
    this.mostrarejemplo = false;
    this.product.urlmostrar = this.inputimagen.nativeElement.value;
    this.product.filepath = this.filepath;
    this.productsService.addproduct(this.product);
    this.product = {} as Product;
    this.filepath = undefined;

  }

  uploadFile(event) {
    this.mostrarejemplo = true;
    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    if (this.filepath === undefined) {
       this.filepath = `imagenes/imagen_${id}`; }  else {}
    const fileRef = this.storage.ref(this.filepath);
    const task = this.storage.upload(this.filepath, file);
      // observe percentage changes
    this.uploadPercent = task.percentageChanges();
       // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
           )
    .subscribe();

  }

}
