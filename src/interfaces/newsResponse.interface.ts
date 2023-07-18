export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: null | string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: null | string;
}

export interface Source {
  id: null | string;
  name: string;
}
