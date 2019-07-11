import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { CustommaterialModule } from './custommaterial.module';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { AdminordersComponent } from './admin/adminorders/adminorders.component';
import { AdmincartsComponent } from './admin/admincarts/admincarts.component';
import { AdminusersComponent } from './admin/adminusers/adminusers.component';
import { CartsComponent } from './user/carts/carts.component';
import { UserComponent } from './user/user/user.component';
import { LoginComponent } from './user/login/login.component';
import { OrdersComponent } from './user/orders/orders.component';
import { ProductComponent } from './user/product/product.component';

//Firebase stuff
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutusComponent,
    SettingsComponent,
    SetproductComponent,
    AdmintabComponent,
    AdminordersComponent,
    AdmincartsComponent,
    AdminusersComponent,
    CartsComponent,
    UserComponent,
    LoginComponent,
    OrdersComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustommaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'webshop'), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
