import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
