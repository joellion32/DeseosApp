import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasComponent } from './listas/listas.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { PipeModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [ListasComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    PipeModule
  ], 
  exports: [
    ListasComponent
  ]
})
export class ComponentsModule { }
