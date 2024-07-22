import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[myNumberOnly]'
})
export class NumberOnlyDirective {
  constructor(private _el: ElementRef) { }
  @HostListener('input')

  onkeypress(e) {
    let event = e || window.event;
    if (event) {
      return this.isNumberKey(event);
    }
  }
  isNumberKey(event) {

    const initalValue = this._el.nativeElement.value;
    console.log(initalValue)
    this._el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }


    // let charCode = event.which ? event.which : event.keyCode;
    // if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    //   return false;
    // }
    // return true;
  }
}
