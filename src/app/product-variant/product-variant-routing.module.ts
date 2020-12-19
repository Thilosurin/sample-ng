import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { InformationComponent } from './create/information/information.component';
import { SelectCreateVariantComponent } from './create/select-create-variant/select-create-variant.component';
import { VariantComponent } from './create/variant/variant.component';
import { PacksizeComponent } from './create/packsize/packsize.component';
import { MoreDetailComponent } from './create/more-detail/more-detail.component';
import { SetPriceComponent } from './create/set-price/set-price.component';
import { ShippingComponent } from './create/shipping/shipping.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent,
    children: [
      {
        path: 'select',
        component: SelectCreateVariantComponent,
      },
      {
        path: 'variant',
        component: VariantComponent,
      },
      {
        path: 'packsize',
        component: PacksizeComponent,
      },
      {
        path: 'info',
        component: InformationComponent,
      },
      {
        path: 'detail',
        component: MoreDetailComponent,
      },
      {
        path: 'price',
        component: SetPriceComponent,
      },
      {
        path: 'shipping',
        component: ShippingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductVariantRoutingModule {}
