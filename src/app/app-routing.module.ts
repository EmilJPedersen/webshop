import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { SettingsComponent } from './settings/settings.component';
import { AdmintabComponent } from './admin/admintab/admintab.component';
import { SetproductComponent } from './admin/setproduct/setproduct.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/aboutus', pathMatch:'full'},
  {path: 'aboutus', component: AboutusComponent},
  //{path: 'setproduct', component: SetproductComponent},
  {path: 'admin', component: AdmintabComponent},
  {path: 'settings', component: SettingsComponent
},
  {path: '**', redirectTo: '/aboutus', pathMatch:'full'},
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
