import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHoverHighlight]'
})
export class HoverHighlightDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlightCard(true);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlightCard(false);
  }

  private highlightCard(shouldHighlight: boolean) {
    const backgroundColor = shouldHighlight ? 'lightyellow' : 'transparent';
    this.renderer.setStyle(this.el.nativeElement, 'background-color', backgroundColor);
  }
}
