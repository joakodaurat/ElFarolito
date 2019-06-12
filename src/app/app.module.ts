import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './components/products/products.component';
// conexion con angular firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
// modulos de firebase
// modulos firestore
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
// modulo para subir archivos
import { AngularFireStorageModule } from '@angular/fire/storage';
// modulo para ver usuario
import { AngularFireAuthModule } from '@angular/fire/auth';

import {FormsModule} from '@angular/forms';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './admin/login/login.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { DetalleComponent } from './components/detalle/detalle.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductFormComponent,
    ProductsComponent,
    MenuComponent,
    LoginComponent,
    CarritoComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    
  ],
  // uso el firestoreSettingToken para error "timestampsInSnapshots setting now defaults to true.."
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
