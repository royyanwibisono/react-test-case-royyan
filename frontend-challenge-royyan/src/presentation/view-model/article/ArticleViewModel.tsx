import { ISource } from '../../../domain/entity/article/models/ArticleHolder';
import BaseViewModel from '../BaseViewModel';

export default interface ArticleViewModel extends BaseViewModel {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

  visible: boolean;
  onUpdateArticle(
    source: ISource,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string ): void;
  onShowArticle(isShowArticle: boolean): void;
}