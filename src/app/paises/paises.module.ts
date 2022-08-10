import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ReactiveFormsModule
    ],
  declarations: [
    SelectorPageComponent
  ]
})
export class PaisesModule { }