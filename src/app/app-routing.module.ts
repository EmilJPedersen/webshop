import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { SettingsComponent } from './settings/settings.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { ProductComponent } from './user/product/product.component';
import { LoginComponent } from './user/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch:'full'},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdmintabComponent, canActivate: [AuthGuardAdmin]},
  {path: 'product', component: ProductComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/login', pathMatch:'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
