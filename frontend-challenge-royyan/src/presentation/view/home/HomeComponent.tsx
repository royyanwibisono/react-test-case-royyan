import React, { ReactNode } from 'react';
import BaseView from '../BaseView';
import HomeViewModel from '../../view-model/home/HomeViewModel';
import Layout, { Content, Header } from 'antd/es/layout/layout';
import { ConfigProvider, Switch, theme } from 'antd';

export interface HomeComponentProps {
  homeViewModel: HomeViewModel;
  children: ReactNode;
}

export interface HomeComponentState {
  isDarkMode: boolean;
  darkModeString: string;
}

export default class AuthComponent extends React.Component<HomeComponentProps, HomeComponentState>
  implements BaseView {
    private homeViewModel: HomeViewModel;
    private children: ReactNode;

  public constructor(props: HomeComponentProps) {
    super(props);

    const { homeViewModel, children } = this.props;
    this.homeViewModel = homeViewModel;
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
          colorPrimary: '#c96604',
        },
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
        <Layout className={darkModeString+ "-mode container"}>
          <Header className=''>
            <Switch
                checked={isDarkMode}
                checkedChildren="Dark"
                unCheckedChildren="Light"
                onChange={this.homeViewModel.onToggleThemeSwitch}
              />
          </Header>
          <Layout>
            <Content>
              {this.children}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}