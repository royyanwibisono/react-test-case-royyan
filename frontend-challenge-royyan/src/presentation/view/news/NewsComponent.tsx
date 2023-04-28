import React from "react";
import NewsViewModel from "../../view-model/news/NewsViewModel";
import BaseView from "../BaseView";
import { Avatar, Card, List } from "antd";
import moment from "moment";

export interface NewsComponentProps {
  newsViewModel: NewsViewModel;
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

  public constructor(props: NewsComponentProps) {
    super(props);

    const { newsViewModel } = this.props;
    this.newsViewModel = newsViewModel;

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
      this.newsViewModel.onSearchNews();
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

    return (
      // <div>
      //   <List
      //     itemLayout="horizontal"
      //     dataSource={articles}
      //     renderItem={(item: any) => (
      //       <List.Item>
      //         <List.Item.Meta
      //           avatar={<Avatar src={item.urlToImage} />}
      //           title={<a href={item.url}>{item.title}</a>}
      //           description={
      //             <div>
      //               <span>{item.source.name}</span>
      //               <span style={{ margin: '0 10px' }}>|</span>
      //               <span>{moment(item.publishedAt).fromNow()}</span>
      //             </div>
      //           }
      //         />
      //       </List.Item>
      //     )}
      //   />
      // </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {articles.map((item: any) => (
          <Card
            key={item.title}
            hoverable
            style={{ width: '300px', margin: '10px' }}
            cover={<img alt={item.title} src={item.urlToImage} />}
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
    );
  }
}