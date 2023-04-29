import ArticleListener from './ArticleListener';

export interface ISource {
  id: string;
  name: string;
}

export default class ArticleHolder {
  private _articleListeners: ArticleListener[];
  private _source: ISource;
  private _author: string;
  private _title: string;
  private _description: string;
  private _url: string;
  private _urlToImage: string;
  private _publishedAt: string;
  private _content: string;

  public constructor() {
    this._articleListeners = [];
    this._source = {id : "", name : ""} as ISource;
    this._author = "";
    this._title = "";
    this._description = "";
    this._url = "";
    this._urlToImage = "";
    this._publishedAt = "";
    this._content = "";
  }

  public onUpdateArticle(
    source: ISource,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
  ): void {
    this._source = source || { id: "", name: "" };
    this._author = author || "";
    this._title = title || "";
    this._description = description || "";
    this._url = url || "";
    this._urlToImage = urlToImage || "";
    this._publishedAt = publishedAt || "";
    this._content = content || "";
    this.notifyListeners();
  }
  

  public getSource(): ISource {
    return this._source;
  }

  public getAuthor(): string {
    return this._author;
  }

  public getTitle(): string {
    return this._title;
  }

  public getDescription(): string {
    return this._description;
  }

  public getUrl(): string {
    return this._url;
  }

  public getUrlToImage(): string {
    return this._urlToImage;
  }

  public getPublishedAt(): string {
    return this._publishedAt;
  }

  public getContent(): string {
    return this._content;
  }

  public addArticleListener(articleListener: ArticleListener): void {
    this._articleListeners.push(articleListener);
  }

  public removeArticleListener(articleListener: ArticleListener): void {
    this._articleListeners.splice(this._articleListeners.indexOf(articleListener), 1);
  }

  private notifyListeners(): void {
    this._articleListeners.forEach((listener) => listener.onArticleChanged());
  }
}