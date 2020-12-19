import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ProdVarService } from '../../prod-var.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.component.html',
  styleUrls: ['./variant.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantComponent implements OnInit {
  form: FormGroup;
  displayModal: boolean = false;
  dialogForm: FormGroup = this.getDialogForm;
  variantAttrForm: FormArray = this.fb.array([]);
  selectedVariantAttr: number = 0;
  uploadedFiles: any[] = [];
  private _onDestroy: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private _productVariant: ProdVarService
  ) {}

  ngOnInit(): void {
    this.form = this._productVariant.form;
  }

  get getDialogForm(): FormGroup {
    return this.fb.group({
      variantTitle: '',
      variantAttr: this.fb.array([]),
    });
  }

  get havePacksInVariant(): FormArray {
    return this.form.get('havePacksInVariant') as FormArray;
  }

  get dialogVariantAttr(): FormArray {
    return this.formArr({ f: this.dialogForm, k: 'variantAttr' });
  }

  addVariant = (): void =>
    this.havePacksInVariant.push(
      this._productVariant.buildFormProductPackInVariant()
    );

  formArr = (x: { f: FormGroup; k: string }): FormArray =>
    this._productVariant.formArr(x);

  formGroup = ({ k, i }: { k: string; i: number }): FormGroup =>
    this.havePacksInVariant.at(i).get(k) as FormGroup;

  pushFormArr = (x: { f: FormArray; e: KeyboardEvent }): void =>
    this._productVariant.pushFormArr(x);

  variantAttrValue = (f: FormGroup): FormArray =>
    this.formArr({ f, k: 'variantAttrValue' });

  removeAttrVariant({ f, i }: { f: FormArray; i: number }): void {
    f.removeAt(i);
    if (!f.length) this.havePacksInVariant.clear();
    else this.generateVariant();
  }

  submitDialog(): void {
    const { variantTitle, variantAttr } = this.dialogForm.value;
    const OBJ = {
      variantTitle,
      variantAttr: this.fb.array(
        variantAttr.map((variantAttrName) =>
          this.fb.group({
            variantAttrName,
            variantAttrValue: this.fb.array([]),
          })
        )
      ),
    };
    this.variantAttrForm.push(this.fb.group(OBJ));
    this.dialogForm = this.getDialogForm;
    this.displayModal = false;
  }

  generateVariant(): void {
    this.havePacksInVariant.clear();
    const varAttr: string[] = this.variantAttrForm
      .at(this.selectedVariantAttr)
      .get('variantAttr').value;

    const pointFree = (a, c) =>
      c.variantAttrValue.length ? a * c.variantAttrValue.length : a;
    const length: number = varAttr.reduce(pointFree, 1);

    let [len, idx, nxIdx] = [length, 0, 0];
    const generateStr = (a, c) => {
      len /= c.variantAttrValue.length;
      for (let i = 0; i < c.variantAttrValue.length; i++) {
        for (let j = 0; j < len; j++) {
          a[idx][nxIdx] = c.variantAttrValue[i];
          idx++;
        }
        if (i === c.variantAttrValue.length - 1 && length > idx) i = -1;
      }
      idx = 0;
      nxIdx++;
      return a;
    };

    varAttr
      .reduce(
        generateStr,
        Array.from({ length }, () => [])
      )
      .forEach((varAttr, index) => {
        this.addVariant();
        varAttr.forEach((v) =>
          (this.havePacksInVariant
            .at(index)
            .get('variantHierarchy') as FormArray).push(this.fb.control(v))
        );
      });
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
