import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Article, ArticlesService } from './articles.service';
import { ArrowIconComponent } from './icons/arrow-icon.component';
import { DownloadIconComponent } from './icons/download-icon.component';
import { WhatsappIconComponent } from './icons/whatsapp-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArrowIconComponent, DownloadIconComponent, WhatsappIconComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly articlesService = inject(ArticlesService);

  readonly articles = signal<Article[]>([]);
  readonly featuredArticle = computed(() => this.articles()[0]);
  readonly restArticles = computed(() => this.articles().slice(1));

  async ngOnInit(): Promise<void> {
    this.articles.set(await this.articlesService.load());
  }

  readLabel(article: Article): string {
    return article.outlet ? `Leer en ${article.outlet}` : 'Leer nota';
  }
}
