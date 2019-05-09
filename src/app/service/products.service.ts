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
 

  constructor(public db: AngularFirestore, public storage: AngularFireStorage) {
    //el de abajo trae productos pero no su id
   // this.products = db.collection('products').valueChanges();
   // utilizamos mejor una angularfirecollection que trae el id de la basedatos llamada 'products'
   this.productsCollections = db.collection<Product>('products');
   // luego mapeamos de esa colleccion el id, el snapsshotchanges nos trae info cuando cambia
   
   this.products = this.productsCollections.snapshotChanges().pipe(
      map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Product;
      data.id = a.payload.doc.id;
      return data;
      })));  
   }

   getProducts() {
     return this.products;
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

}
