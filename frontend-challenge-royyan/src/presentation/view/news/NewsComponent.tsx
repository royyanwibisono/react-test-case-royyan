import React from "react";
import NewsViewModel from "../../view-model/news/NewsViewModel";
import BaseView from "../BaseView";
import { Avatar, Card, List, Pagination } from "antd";
import moment from "moment";
import Text from 'antd/es/typography/Text';
import ArticleViewModel from "../../view-model/article/ArticleViewModel";
import ArticleComponent from "../article/ArticleComponent";

export interface NewsComponentProps {
  newsViewModel: NewsViewModel;
  articleViewModel: ArticleViewModel;
}

export interface NewsComponentState {
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
  articles: [];
}

export default class NewsComponent extends React.Component<NewsComponentProps, NewsComponentState>
  implements BaseView {
  private newsViewModel: NewsViewModel;
  private articleViewModel: ArticleViewModel;

  public constructor(props: NewsComponentProps) {
    super(props);

    const { newsViewModel, articleViewModel } = this.props;
    this.newsViewModel = newsViewModel;
    this.articleViewModel = articleViewModel;

    this.state = {
      country: newsViewModel.country,
      category: newsViewModel.category,
      sources: newsViewModel.sources,
      keyword: newsViewModel.keyword,
      pageSize: newsViewModel.pageSize,
      page: newsViewModel.page,

      isShowError: newsViewModel.isShowError,
      errorMessage: newsViewModel.errorMessage,

      status: newsViewModel.status,
      totalResults: newsViewModel.totalResults,
      articles: newsViewModel.articles,
    };
  }

  public componentDidMount(): void {
    this.newsViewModel.attachView(this);

    if (this.newsViewModel.status !== "loading") {
      this.newsViewModel.onSearchNews("","","","dall-e",20,1);
    }
    
  }

  public componentWillUnmount(): void {
    this.newsViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      country: this.newsViewModel.country,
      category: this.newsViewModel.category,
      sources: this.newsViewModel.sources,
      keyword: this.newsViewModel.keyword,
      pageSize: this.newsViewModel.pageSize,
      page: this.newsViewModel.page,

      isShowError: this.newsViewModel.isShowError,
      errorMessage: this.newsViewModel.errorMessage,

      status: this.newsViewModel.status,
      totalResults: this.newsViewModel.totalResults,
      articles: this.newsViewModel.articles,
    });
  }

  private _onArticleClicked = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const elementId: string = e.currentTarget.id;
    const idAsInt: number = parseInt(elementId, 10);
    const a = this.state.articles[idAsInt] as ArticleViewModel;
    this.articleViewModel.onUpdateArticle(a.source,a.author,a.title,a.description,a.url,a.urlToImage,a.publishedAt,a.content)
    this.articleViewModel.onShowArticle(true);
  };

  private _onArticleClose = () => {
    this.articleViewModel.onShowArticle(false);
  }

  private _onPaginationChanged = (page: number, pageSize: number) => {
    this.newsViewModel.onPagination(pageSize, page);
  };

  public render(): JSX.Element {
    const {
      country,
      category,
      sources,
      keyword,
      pageSize,
      page,

      isShowError,
      errorMessage,

      status,
      totalResults,
      articles,
    } = this.state;

    const pagination = <>{!isShowError && <div style={{ textAlign: 'center', padding: '1rem 0'}}>
      <Pagination 
        defaultCurrent={1}
        current={page}
        defaultPageSize={pageSize}
        total={totalResults}
        showSizeChanger={false}
        onChange={this._onPaginationChanged}
        
      />
    </div>}</>

    return (
      <>
      <ArticleComponent articleViewModel={this.articleViewModel} onCloseButtonClicked={this._onArticleClose}/>
      {/* <div>
        <List
          itemLayout="horizontal"
          dataSource={articles}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.urlToImage} />}
                title={<a href={item.url}>{item.title}</a>}
                description={
                  <div>
                    <span>{item.source.name}</span>
                    <span style={{ margin: '0 10px' }}>|</span>
                    <span>{moment(item.publishedAt).fromNow()}</span>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div> */}
      {pagination}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isShowError?<p>
          <Text type='danger'>{errorMessage}</Text>
        </p> 
        : 
        articles.map((item: any, index: number) => (
          <Card
            key={index + "-" + item.title}
            id={index  + ""}
            hoverable
            style={{ width: '300px', margin: '10px' }}
            cover={<img alt={item.title} src={item.urlToImage} />}
            onClick={this._onArticleClicked}
          >
            <Card.Meta
              title={<a href={item.url}>{item.title}</a>}
              description={
                <div>
                  <span>{item.source.name}</span>
                  <span style={{ margin: '0 10px' }}>|</span>
                  <span>{moment(item.publishedAt).fromNow()}</span>
                </div>
              }
            />
          </Card>
        ))}
      </div>
      {pagination}
      </>
    );
  }
}