import { Injectable } from '@angular/core';

export interface Article {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  readTime: string;
  outlet: string;
  url: string;
}

/**
 * Link de la planilla de Google Sheets publicada como CSV
 * (Archivo → Compartir → Publicar en la web → formato CSV).
 * Mientras esté vacío, el sitio usa public/notas.csv.
 */
export const ARTICLES_SHEET_URL = '';

const LOCAL_CSV_URL = '/notas.csv';

/** Columna de la planilla → campo de la nota. */
const COLUMNS: Record<string, keyof Article> = {
  fecha: 'date',
  categoria: 'category',
  titulo: 'title',
  bajada: 'excerpt',
  'tiempo de lectura': 'readTime',
  medio: 'outlet',
  link: 'url',
};

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  async load(): Promise<Article[]> {
    if (ARTICLES_SHEET_URL) {
      try {
        return parseArticles(await fetchText(ARTICLES_SHEET_URL));
      } catch (error) {
        console.error('No se pudo leer la planilla de notas, uso la copia local.', error);
      }
    }
    return parseArticles(await fetchText(LOCAL_CSV_URL));
  }
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${response.status} al pedir ${url}`);
  }
  return response.text();
}

function parseArticles(csv: string): Article[] {
  const [header = [], ...rows] = parseCsv(csv);
  const fields = header.map((name) => COLUMNS[normalize(name)]);

  return rows
    .map((row) => {
      const article: Article = { category: '', date: '', title: '', excerpt: '', readTime: '', outlet: '', url: '' };
      row.forEach((value, index) => {
        const field = fields[index];
        if (field) {
          article[field] = value.trim();
        }
      });
      // Permite cargar solo el número de minutos: "8" → "8 min de lectura".
      if (/^\d+$/.test(article.readTime)) {
        article.readTime += ' min de lectura';
      }
      return article;
    })
    .filter((article) => article.title);
}

/** "Título " → "titulo" */
function normalize(name: string): string {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase();
}

/** CSV con comillas, comas y saltos de línea dentro de las celdas, como lo exporta Google Sheets. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"' && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && text[i + 1] === '\n') {
        i++;
      }
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows;
}
