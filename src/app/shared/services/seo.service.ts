import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  /**
   * Met à jour dynamiquement les balises SEO de la page
   * @param title Titre propre de la page (ex: "Max Verstappen")
   * @param description Description pour Google
   * @param image URL de l'image de partage
   */
  updateMeta(title: string, description: string, image?: string) {
    const tabTitle = `${title} | Race Query`;
    this.titleService.setTitle(tabTitle);

    this.metaService.updateTag({ name: 'description', content: description });

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    if (image) {
      this.metaService.updateTag({ property: 'og:image', content: image });
    }

    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }
}
