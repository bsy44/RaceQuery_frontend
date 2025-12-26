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
   * @param title Titre de la page
   * @param description Description pour Google (Meta Description)
   * @param image Optionnel : URL d'une image pour le partage social (ex: photo du pilote)
   */
  updateMeta(title: string, description: string, image?: string) {
    const fullTitle = `${title} | Race Query`;

    // 1. Titre de l'onglet
    this.titleService.setTitle(fullTitle);

    // 2. Meta Description (Ce que Google affiche sous le lien)
    this.metaService.updateTag({ name: 'description', content: description });

    // 3. Balises Open Graph (Pour Discord, Twitter, Facebook)
    this.metaService.updateTag({ property: 'og:title', content: fullTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });

    if (image) {
      this.metaService.updateTag({ property: 'og:image', content: image });
    }

    // 4. Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
  }
}
