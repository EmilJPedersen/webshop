import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './shared/aboutus/aboutus.component';
import { SettingsComponent } from './settings/settings.component';
import { SetproductComponent } from './admin/setproduct.component'

const routes: Routes = [
  {path: '', redirectTo: '/aboutus', pathMatch:'full'},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'setproduct', component: SetproductComponent},
  {path: '**', redirectTo: '/aboutus', pathMatch:'full'}
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
