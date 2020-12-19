import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PTableRoutingModule } from './p-table-routing.module';
import { PTableComponent } from './p-table.component';
import { TableModule } from 'primeng/table';

const PRIMENG = [TableModule];

@NgModule({
  declarations: [PTableComponent],
  imports: [CommonModule, PTableRoutingModule, ...PRIMENG],
})
export class PTableModule {}
