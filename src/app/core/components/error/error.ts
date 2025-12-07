import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [
    RouterLink
  ],
  templateUrl: './error.html',
  styleUrl: './error.css',
})
export class Error {
  @Input() code: string = '404';
  @Input() title: string = 'Sortie de Piste !';
  @Input() message: string = "Page non trouvée";
}
