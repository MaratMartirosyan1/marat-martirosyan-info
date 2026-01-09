import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);

  updateMetaTags(data: SeoData): void {
    if (data.title) {
      this.titleService.setTitle(`${data.title} | Marat Martirosyan`);
      this.meta.updateTag({ property: 'og:title', content: data.title });
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }

    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
      this.meta.updateTag({ property: 'og:description', content: data.description });
      this.meta.updateTag({ name: 'twitter:description', content: data.description });
    }

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    if (data.author) {
      this.meta.updateTag({ name: 'author', content: data.author });
    }

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }

    if (data.url) {
      this.meta.updateTag({ property: 'og:url', content: data.url });
      this.meta.updateTag({ name: 'twitter:url', content: data.url });
    }

    const type = data.type || 'website';
    this.meta.updateTag({ property: 'og:type', content: type });

    if (data.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: data.publishedTime });
    }

    if (data.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: data.modifiedTime });
    }

    if (data.tags && data.tags.length > 0) {
      data.tags.forEach((tag) => {
        this.meta.addTag({ property: 'article:tag', content: tag });
      });
    }

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  addStructuredData(data: Record<string, unknown>): void {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }
}
