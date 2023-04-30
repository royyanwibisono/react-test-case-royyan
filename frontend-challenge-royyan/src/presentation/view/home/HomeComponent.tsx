import HomeViewModel from '../../view-model/home/HomeViewModel';
import AuthComponent from '../auth/AuthComponent';
import AuthViewModel from '../../view-model/auth/AuthViewModel';
import { ConfigProvider, Layout, Switch, theme, Typography } from 'antd';
import { Component, ReactNode } from 'react';
import BaseView from '../BaseView';
import './home-component.css';

const { Title } = Typography;
const { Header, Content } = Layout;

export interface HomeComponentProps {
  homeViewModel: HomeViewModel;
  authViewModel : AuthViewModel;
  children: ReactNode;
}

export interface HomeComponentState {
  isDarkMode: boolean;
  darkModeString: string;
}

export default class HomeComponent extends Component<HomeComponentProps, HomeComponentState>
  implements BaseView {
    private homeViewModel: HomeViewModel;
    private authViewModel : AuthViewModel;
    private children: ReactNode;

  public constructor(props: HomeComponentProps) {
    super(props);

    const { homeViewModel, authViewModel, children } = this.props;
    this.homeViewModel = homeViewModel;
    this.authViewModel = authViewModel;
    this.children = children;

    this.state = {
      isDarkMode: homeViewModel.isDarkMode,
      darkModeString : homeViewModel.darkModeString,
    };
  }

  public componentDidMount(): void {
    this.homeViewModel.attachView(this);
  }

  public componentWillUnmount(): void {
    this.homeViewModel.detachView();
  }

  public onViewModelChanged(): void {
    this.setState({
      isDarkMode: this.homeViewModel.isDarkMode,
      darkModeString : this.homeViewModel.darkModeString,
    });
  }

  public render(): JSX.Element {
    const {
      isDarkMode,
      darkModeString,
    } = this.state;

    return (
      <ConfigProvider theme={{
        token: {
          colorPrimary: isDarkMode? '#c96604' : '#ff6600',
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
        <Layout className={darkModeString+ "-mode container"} role='container'>
          <Header className="header">
            <a href={process.env.PUBLIC_URL}>
              <Title 
                level={2} 
                style={{
                  margin: 0,
                }}>
                  News
              </Title>
            </a>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              alignItems: 'center'
            }}>
              <AuthComponent authViewModel={this.authViewModel} />
              <Switch
                  checked={isDarkMode}
                  checkedChildren="Dark"
                  unCheckedChildren="Light"
                  onChange={this.homeViewModel.onToggleThemeSwitch}
              />
            </div>
          </Header>
          <Content className='content'>
            {this.children}
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }
}