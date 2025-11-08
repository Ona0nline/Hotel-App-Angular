import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  // Need to make sure HomeModule is imported everywhere then export the relevant components
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
