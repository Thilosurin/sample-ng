import { Component, Input } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'c-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control: FormControl = new FormControl('')
  @Input() placeholder: string = ''
  @Input() labelMB: string = '5px'
  @Input() width: string = '100%'
  @Input() label: string
  @Input() unit: string
  @Input() mt: string = '0.5rem'
  @Input() fontWeight: string = '400'
  @Input() required: boolean = false
  // @Input() minWidth: string = '300px'
  @Input() padding: string = '10px'
  @Input() border: string = '0.5px solid #A9B1BE'
  @Input() borderRadius: string = '5px'
  @Input() background: string = 'transparent'
  @Input() labelWidth: string = 'auto'

  @Input() dMask: string
  @Input() thousandSeparator: string
  @Input() dPhone: boolean = false
  @Input() dPhoneNew: boolean = false
  @Input() dChar: boolean = false
  @Input() dNumber: boolean = false
  @Input() dDecimal: boolean = false
  @Input() dSKU: boolean = false

  showError(): ValidationErrors {
    const { dirty, touched, errors } = this.control
    return dirty && touched && errors
  }
}
