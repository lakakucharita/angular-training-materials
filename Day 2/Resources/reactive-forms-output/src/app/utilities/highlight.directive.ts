import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.backgroundColor = "yellow";
    el.nativeElement.style.fontStyle = "italic";
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.textDecoration = "underline";
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.textDecoration = "none";
  }
}
