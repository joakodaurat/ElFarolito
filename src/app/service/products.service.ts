import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsCollections: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;
  productoDoc: AngularFirestoreDocument<Product>;
  productos: Product[];
 

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {
  
   }

 

    //Obtiene todos los Productos
  public getProducts() {
    return this.db.collection('products').snapshotChanges();
  }
    //Obtiene un producto
  public getProduct(documentId: string) {
    return this.db.collection('products').doc(documentId).snapshotChanges();
  }

   addproduct(product: Product) {
    this.productsCollections.add(product);
   }

   deleteproduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.delete();
    this.storage.storage.refFromURL(product.urlmostrar).delete();
   }

   updateproduct(product: Product) {
    this.productDoc = this.db.doc(`products/${product.id}`);
    this.productDoc.update(product);
   }

    //Crea un nuevo producto
  public createCat(data: {nombre: string, url: string}) {
    return this.firestore.collection('cats').add(data);
  }
  //Obtiene un producto
  public getCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }
 
  //Actualiza un producto
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }

   //Elimina un producto
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }

  

}
