import React from 'react';
import { Button, Layout, Typography} from 'antd';
import ArticleViewModel from '../../view-model/article/ArticleViewModel';
import { ISource } from '../../../domain/entity/article/models/ArticleHolder';
import BaseView from '../BaseView';
import moment from 'moment';
import './article-component.css';

const { Title } = Typography;
const { Content, Header } = Layout;

export interface ArticleComponentProps {
  articleViewModel: ArticleViewModel;
  onCloseButtonClicked: ()=>void;
}

export interface ArticleComponentState {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;

  visible: boolean;
}

export default class ArticleComponent extends React.Component<ArticleComponentProps, ArticleComponentState>
  implements BaseView {
  private articleViewModel: ArticleViewModel;
  private onCloseButtonClicked: () => void

  public constructor(props: ArticleComponentProps) {
    super(props);

    const { articleViewModel, onCloseButtonClicked } = this.props;
    this.articleViewModel = articleViewModel;
    this.onCloseButtonClicked = onCloseButtonClicked;

    this.state = {
      source: articleViewModel.source,
      author: articleViewModel.author,
      title: articleViewModel.title,
      description: articleViewModel.description,
      url: articleViewModel.url,
      urlToImage: articleViewModel.urlToImage,
      publishedAt: articleViewModel.publishedAt,
      content: articleViewModel.content,

      visible: false
    };
  }

  public componentDidMount(): void {
    this.articleViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.articleViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      source: this.articleViewModel.source,
      author: this.articleViewModel.author,
      title: this.articleViewModel.title,
      description: this.articleViewModel.description,
      url: this.articleViewModel.url,
      urlToImage: this.articleViewModel.urlToImage,
      publishedAt: this.articleViewModel.publishedAt,
      content: this.articleViewModel.content,

      visible: this.articleViewModel.visible,
    });
  }

  public render(): JSX.Element {
    const {
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content,

      visible,
    } = this.state;

    if (!visible){
      return(<></>);
    }

    return (
      <Layout className="acontainer" role='acontainer'>
          <Header className="article">
            <a href={url}>
              <Title 
                level={3} 
                style={{
                  margin: 0,
                }}>
                  {source.name}
              </Title>
            </a>
            <Button type='ghost' onClick={this.onCloseButtonClicked}>CLOSE</Button>
          </Header>
          <Content className='content'>
            <div style={{ display: 'flex', flexDirection: 'column'}}>
              <img src={urlToImage} alt={title} />
              <div style={{padding: '2rem'}}>
                <Title 
                  level={1} 
                  style={{
                    margin: '0 0 1em 0',
                  }}>
                    {title}
                </Title>
                <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
                  {description}
                </p>
                <div>
                  <span><strong>Author:</strong> {author??"Unknown"}</span>
                  <span style={{ margin: '0 10px' }}>|</span>
                  <span><strong>Source:</strong> {source.name}</span>
                  <span style={{ margin: '0 10px' }}>|</span>
                  <span><strong>Published:</strong> {moment(publishedAt).fromNow()}</span>
                </div>
                <p style={{ marginTop: '1em', fontSize: '1.4em' }}>{content}</p>
                <Button type='primary' href={url} role='continuereading'>Continue reading...</Button>
              </div>
            </div>
          </Content>
      </Layout>
    );
  }
}