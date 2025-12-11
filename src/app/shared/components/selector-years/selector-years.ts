import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-year-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selector-years.html',
  styleUrls: ['./selector-years.css']
})
export class SelectorYears {
  @Input() years: number[] = [];
  @Input() selectedYear: number = new Date().getFullYear();
  @Output() selectedYearChange = new EventEmitter<number>();

  isOpen = false;

  constructor(private eRef: ElementRef) {}

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.selectedYearChange.emit(year);
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
