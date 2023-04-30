import React from "react";
import NewsViewModel from "../../view-model/news/NewsViewModel";
import BaseView from "../BaseView";
import { Button, Card, Input, Layout, Menu, Pagination, Select, Typography } from "antd";
import moment from "moment";
import ArticleViewModel from "../../view-model/article/ArticleViewModel";
import ArticleComponent from "../article/ArticleComponent";
import { Article } from "../../../domain/entity/news/structures/NewsResult";
import { SearchOutlined } from '@ant-design/icons';
import './news-component.css'
import NewsApiUtils from "../../util/NewsApiUtils";

const { Text } = Typography;
const { Header } = Layout;
const { Option } = Select;

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
  articles: Article[];
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
    } else {
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  public componentWillUnmount(): void {
    document.removeEventListener('keydown', this._handleKeyDown);
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

  private _onSearch = () =>{
    this.newsViewModel.onSearchNews("","","",this.newsViewModel.keyword,20,1);
  }

  private _handleKeyDown = (event: { key: string; }) => {
    if (event.key === 'Backspace' && this.articleViewModel.visible) {
      this.articleViewModel.onShowArticle(false);
    }
  };

  private _handleSearchEnter = (event: {key :string}) => {
    if (event.key === 'Enter') {
      this._onSearch();
    }
  };

  private _countryChanged = (value: string) => {
    this.newsViewModel.onSearchNews(value,this.newsViewModel.category,"","",20,1);
  }

  private _menuOnCLicked = (e : any) =>{
    const menuItems = NewsApiUtils.getCategoryList()
    const category = menuItems[e.key];
    console.log(category)
    this.newsViewModel.onSearchNews(this.newsViewModel.country===""?"us":this.newsViewModel.country,category,"","",20,1);
  }

  public render(): JSX.Element {
    const {
      country,
      category,
      // sources,
      keyword,
      pageSize,
      page,

      isShowError,
      errorMessage,

      // status,
      totalResults,
      articles,
    } = this.state;

    const menuItems = NewsApiUtils.getCategoryList();
    const items = [];
    for(let i = 0; i < menuItems.length;i++){
      items.push({
        label: <Text style={{ textTransform: 'capitalize' }}>{menuItems[i]}</Text>,
        key: i,
      })
    }

    const pagination = <>{(totalResults > pageSize) && <div style={{ textAlign: 'center', padding: '1rem 0'}}>
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
      <Header role="headernews" className="headernews">
        <Menu onClick={this._menuOnCLicked} mode="horizontal" defaultSelectedKeys={menuItems.includes(category) ? [''+menuItems.indexOf(category)]:['-1']} items={items} />
        <div className="search-bar">
          <Select
            value={country}
            onChange={this._countryChanged}
            placeholder="Country"
            style={{ width: 85 }}
            
          >
            {NewsApiUtils.getCountryList().map((country, index) => (
              <Option key={index} value={country}>
                {country}
              </Option>
            ))}
          </Select>
          <Input
            value={keyword}
            onChange={(e)=>this.newsViewModel.onKeywordQueryChanged(e.currentTarget.value)}
            prefix={<SearchOutlined />}
            placeholder="Search articles"
            onKeyDown={this._handleSearchEnter}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={this._onSearch}>
            Search
          </Button>
        </div>
      </Header>
      {pagination}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isShowError?<>
        <p style={{padding: '2rem'}}>
          <Text type='danger'>{errorMessage}</Text>
        </p>
        <Button type="primary" href={process.env.PUBLIC_URL}>OK</Button>
        </> 
        : articles.length === 0 ?
        <p style={{padding: '2rem'}}>
          <Text type='success'>No result found!</Text>
        </p>
        :
        articles.map((item: Article, index: number) => (
          <Card
            key={index + "-" + item.title}
            id={index  + ""}
            hoverable
            style={{ width: '300px', margin: '10px' }}
            cover={<img alt={item.title} src={item.urlToImage} />}
            onClick={this._onArticleClicked}
          >
            <Card.Meta
              title={<a href="/#">{item.title}</a>}
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