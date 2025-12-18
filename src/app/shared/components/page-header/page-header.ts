import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectorYears } from '../selector-years/selector-years';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, FormsModule, SelectorYears],
  templateUrl: './page-header.html',
  styleUrls: ['./page-header.css']
})
export class PageHeader {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() years: number[] = [];
  @Input() selectedYear!: number;
  @Input() isInline!: boolean;
  @Output() selectedYearChange = new EventEmitter<number>();

  onYearChange(year: number) {
    this.selectedYearChange.emit(year);
  }
}
