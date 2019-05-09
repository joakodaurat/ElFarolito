import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {path: 'inicio', component: ProductsComponent},
  { path:  'admin', component:  LoginComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'inicio'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
