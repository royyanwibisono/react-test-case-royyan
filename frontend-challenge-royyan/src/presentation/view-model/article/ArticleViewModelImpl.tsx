import ArticleHolder, { ISource } from "../../../domain/entity/article/models/ArticleHolder";
import ArticleListener from "../../../domain/entity/article/models/ArticleListener";
import BaseView from "../../view/BaseView";
import ArticleViewModel from "./ArticleViewModel";

export default class ArticleViewModelImpl implements ArticleViewModel, ArticleListener {
  public source: ISource;
  public author: string;
  public title: string;
  public description: string;
  public url: string;
  public urlToImage: string;
  public publishedAt: string;
  public content: string;

  private baseView?: BaseView;
  private articleHolder: ArticleHolder;
  
  public visible: boolean;

  public constructor(articleHolder: ArticleHolder) {
    this.source = articleHolder.getSource();
    this.author = articleHolder.getAuthor();
    this.title = articleHolder.getTitle();
    this.description = articleHolder.getDescription();
    this.url = articleHolder.getUrl();
    this.urlToImage = articleHolder.getUrlToImage();
    this.publishedAt = articleHolder.getPublishedAt();
    this.content = articleHolder.getContent();

    this.articleHolder = articleHolder;
    this.visible = false;

    this.articleHolder.addArticleListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public onArticleChanged = (): void => {
    this.source = this.articleHolder.getSource();
    this.author = this.articleHolder.getAuthor();
    this.title = this.articleHolder.getTitle();
    this.description = this.articleHolder.getDescription();
    this.url = this.articleHolder.getUrl();
    this.urlToImage = this.articleHolder.getUrlToImage();
    this.publishedAt = this.articleHolder.getPublishedAt();
    this.content = this.articleHolder.getContent();

    this.notifyViewAboutChanges();
  };

  public onUpdateArticle(source: ISource, author: string, title: string, description: string, url: string, urlToImage: string, publishedAt: string, content: string): void {
    this.source = source;
    this.author = author;
    this.title = title;
    this.description = description;
    this.url = url;
    this.urlToImage = urlToImage;
    this.publishedAt = publishedAt;
    this.content = content;

    this.notifyViewAboutChanges();
  }

  public onShowArticle(isShowArticle: boolean): void {
    this.visible = isShowArticle;
    this.notifyViewAboutChanges();
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}