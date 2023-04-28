import NewsListener from './NewsListener';

export default class NewsHolder {
  private _newsListeners: NewsListener[];
  private _status: string;
  private _totalResults: number;
  private _articles: unknown;

  public constructor() {
    this._status = "";
    this._totalResults = 0;
    this._articles = null;
    this._newsListeners = [];
  }

  public onUpdateNews(status: string, totalResults: number, articles: unknown): void {
    this._status = status;
    this._totalResults = totalResults;
    this._articles = articles;
    this.notifyListeners();
  }

  public getStatus(): string {
    return this._status;
  }

  public getTotalResult(): number {
    return this._totalResults;
  }

  public getArticles(): unknown {
    return this._articles;
  }


  public addNewsListener(newsListener: NewsListener): void {
    this._newsListeners.push(newsListener);
  }

  public removeNewsListener(newsListener: NewsListener): void {
    this._newsListeners.splice(this._newsListeners.indexOf(newsListener), 1);
  }

  private notifyListeners(): void {
    this._newsListeners.forEach((listener) => listener.onNewsChanged());
  }
}