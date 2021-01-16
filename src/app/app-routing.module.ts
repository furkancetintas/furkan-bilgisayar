import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard'
import { UrundetayComponent } from './components/urundetay/urundetay.component';
import { FavoriteproductComponent } from './components/favoriteproduct/favoriteproduct.component';

const redirectLogin = () => redirectUnauthorizedTo(['giris']);
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'favori-urunlerim',
    component: FavoriteproductComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  {
    path: 'sepet',
    component: ShoppingcartComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin
    }
  },
  { path: 'kaydol', component: SignupComponent },
  { path: 'giris', component: LoginComponent },
  { path: 'urun-detay/:key', component: UrundetayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
