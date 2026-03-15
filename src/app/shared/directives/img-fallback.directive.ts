import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallbackDirective {
  @Input() appImgFallback: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('error')
  onError() {
    const picture = this.el.nativeElement.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source: HTMLSourceElement) => {
        source.removeAttribute('srcset');
      });
    }

    this.el.nativeElement.src = this.appImgFallback;
    this.el.nativeElement.onerror = null;
  }
}
