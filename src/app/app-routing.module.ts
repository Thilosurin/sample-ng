import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerateHtmlComponent } from './generate-html/generate-html.component';

const routes: Routes = [
  {
    path: 'table',
    loadChildren: () =>
      import('./p-table/p-table.module').then((m) => m.PTableModule),
  },
  {
    path: 'variant',
    loadChildren: () =>
      import('./product-variant/product-variant.module').then(
        (m) => m.ProductVariantModule
      ),
  },
  {
    path: 'g-html',
    component: GenerateHtmlComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
