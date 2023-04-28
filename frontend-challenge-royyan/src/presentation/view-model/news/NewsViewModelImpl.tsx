import NewsHolder from "../../../domain/entity/news/models/NewsHolder";
import NewsListener from "../../../domain/entity/news/models/NewsListener";
import FindNewsUseCase from "../../../domain/interactors/news/FindNewsUseCase";
import BaseView from "../../view/BaseView";
import NewsViewModel from "./NewsViewModel";

export default class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public country: string;
  public category: string;
  public sources: string;
  public keyword: string;
  public pageSize: number;
  public page: number

  public isShowError: boolean;
  public errorMessage: string;

  public status: string;
  public totalResults: number;
  public articles: [];

  private baseView?: BaseView;
  private findNewsUseCase: FindNewsUseCase;
  private newsHolder: NewsHolder;

  public constructor(findNewsUseCase: FindNewsUseCase, newsHolder: NewsHolder) {
    this.country = 'id';
    this.category = "";
    this.sources = "";
    this.keyword = "";
    this.pageSize = 20;
    this.page = 1

    this.isShowError = false;
    this.errorMessage = '';

    this.status = "";
    this.totalResults = 0
    this.articles = [];

    this.findNewsUseCase = findNewsUseCase;
    this.newsHolder = newsHolder;

    this.newsHolder.addNewsListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public onNewsChanged = (): void => {
    this.status = this.newsHolder.getStatus();
    this.totalResults = this.newsHolder.getTotalResult();
    this.articles = this.newsHolder.getArticles();
    this.notifyViewAboutChanges();
  }

  public onSearchNews = (): void => {
    this.status = "loading";
    this.findNewsUseCase.searchNews(this.country,this.category,this.sources,this.keyword,this.pageSize,this.page);
    this.notifyViewAboutChanges();
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}