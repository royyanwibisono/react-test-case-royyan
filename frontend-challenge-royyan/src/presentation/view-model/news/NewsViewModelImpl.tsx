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
    this.country = "";
    this.category = "";
    this.sources = "";
    this.keyword = "frontend";
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
    this.errorMessage = this.newsHolder.getCode() +" : " +this.newsHolder.getMessage();
    this.isShowError = this.newsHolder.getCode().length > 0;
    this.notifyViewAboutChanges();
  }

  public onSearchNews = (country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): void => {
    this.status = "loading";
    this.country = country;
    this.category = category;
    this.sources = sources;
    this.keyword = keyword;
    this.page = page;
    this.pageSize = pageSize;
    this.findNewsUseCase.searchNews(country,category,sources,keyword,pageSize,page);
    this.notifyViewAboutChanges();
  }

  public onPagination(pageSize: number, page: number): void {
    this.status = "loading";
    this.page = page;
    this.pageSize = pageSize;
    this.findNewsUseCase.searchNews(this.country,this.category,this.sources,this.keyword,pageSize,page);
    this.notifyViewAboutChanges();
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}