import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appLongPress]'
})
export class LongPressDirective {
  private timeout: any;
  private isPressing: boolean = false;
  private longPressDuration: number = 500;

  @Output() longPress = new EventEmitter();

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onMouseDown(event: Event): void {
    this.isPressing = true;
    this.timeout = setTimeout(() => {
      if (this.isPressing) {
        this.longPress.emit(event);
      }
    }, this.longPressDuration);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  @HostListener('touchend')
  onMouseUp(): void {
    this.isPressing = false;
    clearTimeout(this.timeout);
  }
}
