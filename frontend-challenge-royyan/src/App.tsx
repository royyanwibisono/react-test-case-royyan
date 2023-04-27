import { ConfigProvider, Layout, theme, Switch } from 'antd'
import { Content, Header } from 'antd/es/layout/layout'
import AuthComponent from './presentation/view/auth/AuthComponent';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';
import AuthFakeApi from './data/auth/AuthFakeApi';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      (localStorage.getItem('theme') !== 'light' &&
        matchMedia('(prefers-color-scheme: dark)').matches)
  );
  // data layer
  const authRepository = new AuthFakeApi();
  // domain layer
  const authHolder = new AuthHolder();
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  // view layer
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#c96604',
      },
      algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }}>
      <Layout className={(darkMode?"dark":"light")+ "-mode container"}>
        <Header className=''>
        <Switch
            checked={darkMode}
            checkedChildren="Dark Mode"
            unCheckedChildren="Light Mode"
            onChange={() => {
              localStorage.setItem('theme', darkMode ? 'light' : 'dark');
              setDarkMode(!darkMode);
            }}
          />
        </Header>
        <Layout>
          <Content>
            <AuthComponent authViewModel={authViewModel} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App
