import NewsListener from './NewsListener';

export default class NewsHolder {
  private _newsListeners: NewsListener[];
  private _status: string;
  private _totalResults: number;
  private _articles: [];
  private _code: string;
  private _message: string;

  public constructor() {
    this._status = "";
    this._totalResults = 0;
    this._articles = [];
    this._newsListeners = [];
    this._code = "";
    this._message = "";
  }

  public onUpdateNews(status: string, totalResults: number, articles: [], code: string, message: string): void {
    this._status = status;
    this._totalResults = totalResults;
    this._articles = articles;
    this._code = code;
    this._message = message;
    this.notifyListeners();
  }

  public getStatus(): string {
    return this._status??"";
  }

  public getTotalResult(): number {
    return this._totalResults??0;
  }

  public getArticles(): [] {
    return this._articles??[];
  }

  public getCode(): string {
    return this._code??"";
  }

  public getMessage(): string {
    return this._message??"";
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