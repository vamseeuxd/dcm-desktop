import {Directive, ElementRef} from '@angular/core';
import {NgModel} from '@angular/forms';

@Directive({
  selector: '[ngxLimitToMax]',
  providers: [NgModel],
  host: {
    '(ngModelChange)': 'onInputChange($event)',
    '(keyup)': 'onKeyup($event)',
    '(keydown)': 'onKeyup($event)',
  },
})
export class LimitToMaxDirective {

  constructor(private element: ElementRef, private model: NgModel) {
  }

  onKeyup(e: KeyboardEvent) {
    const maxValue = Number(this.element.nativeElement.attributes.max.value);
    const value = Number(this.element.nativeElement.value);
    if (value > maxValue && e.keyCode !== 46 && e.keyCode !== 8) {
      e.preventDefault();
      this.model.valueAccessor.writeValue(maxValue);
    }
  }

  onInputChange(value) {
    const maxValue = Number(this.element.nativeElement.attributes.max.value);
    if (value > maxValue) {
      this.model.valueAccessor.writeValue(maxValue);
      setTimeout(() => {
        this.model.valueAccessor.writeValue(maxValue);
      }, 10);
    }
  }
}
