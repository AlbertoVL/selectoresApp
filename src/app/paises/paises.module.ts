import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisesRoutingModule } from './paises-routing.module';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

@NgModule({
  imports: [
    CommonModule,
    PaisesRoutingModule,
    ],
  declarations: [
    SelectorPageComponent
  ]
})
export class PaisesModule { }