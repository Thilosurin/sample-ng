import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import {
  IProduct,
  IProductDisplay,
  IProductIndex,
  IProductPackage,
  IProductPackInVariant,
  IProductPackOnly,
  IProductPrice,
  IProductSpec,
  IProductStock,
  IProductVariantInPack,
  IProductVariantOnly,
  IQtyPrice,
} from '@geeesy/type-interfaces/lib/type-catalog';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProdVarService {
  fb: IFormBuilder;
  form: FormGroup;
  private _onDetroy: Subject<void> = new Subject<void>();

  constructor(fb: FormBuilder) {
    this.fb = fb;
    this.buildFormProduct();
  }

  formArr = ({ f, k }: { f: FormGroup; k: string }): FormArray =>
    f.get(k) as FormArray;

  pushFormArr = ({ f, e }: { f: FormArray; e: KeyboardEvent }): void => {
    const { value } = e.target as HTMLInputElement;
    if (!value || f.value.includes(value)) return;
    f.push(this.fb.control(value));
    (e.target as HTMLInputElement).value = '';
  };

  generatePacksizeInVariant$ = combineLatest([])
    .pipe(
      filter((res) => !!res),
      tap((res) => console.log('[GENERATE VARIANT] => ', res)),
      takeUntil(this._onDetroy)
    )
    .subscribe();

  buildFormProduct(): void {
    this.form = this.fb.group<IProduct>({
      productId: '',
      companyId: '',
      productNames: '',
      productCategoryIds: '',
      productCategoryCustomName: '',
      productVideoCoverUrl: '',
      productDescription: '',
      productBrand: '',
      productSource: '',
      productOrigin: '',
      productChannels: this.fb.array(['']),
      productSpec: this.fb.group<IProductSpec>({
        specGroupName: '',
        attributeName: '',
        attributeDataType: '',
        attributeValue: '',
      }),
      haveVariants: this.fb.array([]),
      havePacks: this.fb.array([]),
      haveVariantsInPack: this.fb.array([]),
      havePacksInVariant: this.fb.array([]),
      ...this.productEntityObj(),
    });
  }

  buildFormProductVariantOnly(): IFormGroup<IProductVariantOnly> {
    return this.fb.group<IProductVariantOnly>({
      productVariantId: '',
      ...this.productEntityObj(),
      variantTitle: '',
      variantHierarchy: this.fb.array(['']),
    });
  }

  buildFormProductPackOnly(): IFormGroup<IProductPackOnly> {
    return this.fb.group<IProductPackOnly>({
      productPackId: '',
      ...this.productEntityObj(),
      packTitle: '',
      packSizeLabel: '',
      smallestUnitQty: 0,
    });
  }

  buildFormProductPackInVariant(): IFormGroup<IProductPackInVariant> {
    return this.fb.group<IProductPackInVariant>({
      productVariantPackId: '',
      ...this.productEntityObj(),
      packTitle: '',
      packSizeLabel: '',
      smallestUnitQty: 0,
      variantTitle: '',
      variantHierarchy: this.fb.array(['']),
    });
  }

  buildFormProductVariantInPack(): IFormGroup<IProductVariantInPack> {
    return this.fb.group<IProductVariantInPack>({
      productPackVariantId: '',
      ...this.productEntityObj(),
      packTitle: '',
      packSizeLabel: '',
      smallestUnitQty: 0,
      variantTitle: '',
      variantHierarchy: this.fb.array(['']),
    });
  }

  productEntityObj() {
    return {
      productImagesUrl: this.fb.array(['']),
      productCode: '',
      productSku: '',
      productBarcode: '',
      productUnit: '',
      productShortDescription: '',
      productPrice: this.fb.group<IProductPrice>({
        costPrice: 0,
        buyPrice: 0,
        sellPrice: 0,
        wholesalePrice: 0,
        retailPrice: 0,
        priceList: this.fb.array([
          this.fb.group({
            title: '',
            price: 0,
          }),
        ]),
        currency: '',
      }),
      productWholesales: this.fb.array([
        this.fb.group({
          minQty: 0,
          wholesalePrice: 0,
          retailPrice: 0,
        }),
      ]),
      minQty: 0,
      minWholesaleQty: 0,
      toFreeShip: this.fb.group<IQtyPrice>({
        price: 0,
        qty: 0,
      }),
      productPackage: this.fb.group<IProductPackage>({
        weight: 0,
        weightUnit: '',
        height: 0,
        heightUnit: '',
        width: 0,
        widthUnit: '',
        length: 0,
        lengthUnit: '',
      }),
      index: this.fb.group<IProductIndex>({
        tags: this.fb.array(['']),
        keywords: this.fb.array(['']),
        isActive: false,
        isRecommend: false,
        isHighLight: false,
        isNewArrival: false,
        impFactor: 0,
      }),
      display: this.fb.group<IProductDisplay>({
        onCompanyCard: false,
        onMarketplace: false,
        isPriceShowed: false,
      }),
      stock: this.fb.group<IProductStock>({
        initialStock: 0,
        lowStockQty: 0,
      }),
      preparingTime: 0,
      leadTimes: this.fb.array([
        this.fb.group({
          qty: this.fb.array(['']),
          day: 0,
        }),
      ]),
      createdAt: '',
      updatedAt: '',
    };
  }

  onDetroy(): void {
    this._onDetroy.next();
    this._onDetroy.complete();
  }
}
