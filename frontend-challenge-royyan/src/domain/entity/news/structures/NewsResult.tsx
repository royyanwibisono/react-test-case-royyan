// One more simple structure for transferring between layers
export interface Article {
  source: { name: string; id: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export default interface NewsResult {
  status: string;
  totalResults: number;
  articles: Article[];
  code : string;
  message: string;
}