import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PTableComponent } from './p-table.component';

const routes: Routes = [{ path: '', component: PTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PTableRoutingModule {}
