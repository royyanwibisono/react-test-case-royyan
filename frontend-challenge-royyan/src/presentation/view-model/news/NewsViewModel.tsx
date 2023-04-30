import { Article } from '../../../domain/entity/news/structures/NewsResult';
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
  articles: Article[];

  onSearchNews(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): void;
  onPagination(pageSize: number, page: number): void;
  onKeywordQueryChanged(keyword: string): void;
}