import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BadgeComponent } from './badge/badge.component';
import { PanelComponent } from './panel/panel.component';
import { PanelModule } from 'primeng/panel';
import { UploadComponent } from './upload/upload.component';
import { UploadDirective } from './upload.directive';
import { ProgressBarModule } from 'primeng/progressbar';

const MODULES = [CommonModule, ReactiveFormsModule];
const COMPONENTS = [
  InputComponent,
  BadgeComponent,
  PanelComponent,
  UploadComponent,
];
const DIRECTIVES = [UploadDirective];
const PRIMENG = [PanelModule, ProgressBarModule];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES],
  imports: [...MODULES, ...PRIMENG],
  exports: [...COMPONENTS],
})
export class SharedModule {}
