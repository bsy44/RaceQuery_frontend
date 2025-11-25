import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDragScroll]',
})
export class DragScrollDirective {
  private isDown = false;
  private startX: number = 0;
  private scrollLeft: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'grab');
    this.renderer.setStyle(this.el.nativeElement, 'user-select', 'none');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.isDown = true;
    this.renderer.addClass(this.el.nativeElement, 'active');

    this.startX = e.pageX - this.el.nativeElement.offsetLeft;
    this.scrollLeft = this.el.nativeElement.scrollLeft;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.isDown = false;
    this.renderer.removeClass(this.el.nativeElement, 'active');
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.isDown = false;
    this.renderer.removeClass(this.el.nativeElement, 'active');
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDown) return;

    e.preventDefault();

    const x = e.pageX - this.el.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 1.25;
    this.el.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
}
