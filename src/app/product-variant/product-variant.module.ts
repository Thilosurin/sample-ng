import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductVariantRoutingModule } from './product-variant-routing.module';
import { ProductVariantComponent } from './product-variant.component';
import { CreateComponent } from './create/create.component';
import { InformationComponent } from './create/information/information.component';
import { MoreDetailComponent } from './create/more-detail/more-detail.component';
import { PacksizeComponent } from './create/packsize/packsize.component';
import { SelectCreateVariantComponent } from './create/select-create-variant/select-create-variant.component';
import { SetPriceComponent } from './create/set-price/set-price.component';
import { ShippingComponent } from './create/shipping/shipping.component';
import { VariantComponent } from './create/variant/variant.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { TabViewModule } from 'primeng/tabview';
import { ProdVarService } from './prod-var.service';
import { SharedModule } from '../shared/shared.module';
import { FileUploadModule } from 'primeng/fileupload';

const MODULES = [
  CommonModule,
  ProductVariantRoutingModule,
  ReactiveFormsModule,
  SharedModule,
];
const PRIMENG = [
  TableModule,
  DialogModule,
  TabViewModule,
  ChipsModule,
  MultiSelectModule,
  CalendarModule,
  DropdownModule,
  ProgressBarModule,
  CheckboxModule,
  CardModule,
  FileUploadModule,
];

@NgModule({
  declarations: [
    ProductVariantComponent,
    CreateComponent,
    InformationComponent,
    MoreDetailComponent,
    PacksizeComponent,
    SelectCreateVariantComponent,
    SetPriceComponent,
    ShippingComponent,
    VariantComponent,
  ],
  imports: [...MODULES, ...PRIMENG],
  providers: [ProdVarService],
})
export class ProductVariantModule {}
