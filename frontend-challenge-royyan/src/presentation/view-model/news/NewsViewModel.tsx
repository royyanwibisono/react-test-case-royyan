import BaseViewModel from '../BaseViewModel';

export default interface NewsViewModel extends BaseViewModel {
  country: string;
  category: string;
  sources: string;
  keyword: string;
  pageSize: number;
  page: number

  isShowError: boolean;
  errorMessage: string;

  status: string;
  totalResults: number;
  articles: unknown;

  onNewsChanged(args : unknown): void;
  onSearchNews(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): void;
}