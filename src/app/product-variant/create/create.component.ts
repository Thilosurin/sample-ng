import { Component, OnDestroy } from '@angular/core';
import { ProdVarService } from '../prod-var.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnDestroy {
  constructor(private _productVariant: ProdVarService) {}

  submit(): void {
    
  }

  ngOnDestroy(): void {
    this._productVariant.onDetroy();
  }
}
