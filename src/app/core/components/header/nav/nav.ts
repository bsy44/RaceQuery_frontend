import { Component, ElementRef, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen = false;

  constructor(private eRef: ElementRef) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (this.isMenuOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
