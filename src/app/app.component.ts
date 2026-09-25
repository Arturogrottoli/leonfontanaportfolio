import { Component } from '@angular/core';
import { ArrowIconComponent } from './icons/arrow-icon.component';
import { DownloadIconComponent } from './icons/download-icon.component';
import { WhatsappIconComponent } from './icons/whatsapp-icon.component';

interface Article {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArrowIconComponent, DownloadIconComponent, WhatsappIconComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly articles: Article[] = [
    {
      category: 'Investigación',
      date: '12 septiembre 2026',
      title: 'La ciudad que aprendió a escuchar sus ríos',
      excerpt:
        'Una crónica sobre los barrios que transformaron la relación con el agua y recuperaron una memoria que parecía perdida.',
      readTime: '8 min de lectura',
    },
    {
      category: 'Crónica',
      date: '28 agosto 2026',
      title: 'El último turno de la noche',
      excerpt: 'Historias mínimas de quienes mantienen la ciudad despierta cuando todos duermen.',
      readTime: '6 min de lectura',
    },
    {
      category: 'Opinión',
      date: '14 agosto 2026',
      title: 'Contra la velocidad de las noticias',
      excerpt: 'Por qué contar mejor también significa aprender a esperar.',
      readTime: '4 min de lectura',
    },
    {
      category: 'Entrevista',
      date: '03 julio 2026',
      title: '"La memoria no es un archivo, es una conversación"',
      excerpt: 'Una charla con la historiadora Clara Bianchi sobre el presente y sus preguntas.',
      readTime: '10 min de lectura',
    },
  ];

  get featuredArticle(): Article {
    return this.articles[0];
  }

  get restArticles(): Article[] {
    return this.articles.slice(1);
  }
}
