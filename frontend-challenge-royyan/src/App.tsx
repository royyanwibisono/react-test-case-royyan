import HomeComponent from './presentation/view/home/HomeComponent';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';
import AuthFakeApi from './data/auth/AuthFakeApi';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import SettingsUseCase from './domain/interactors/home/SettingsUseCase';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import HomeHolder from './domain/entity/home/models/HomeHolder';
import HomeViewModelImpl from './presentation/view-model/home/HomeViewModelImpl';
import NewsApi from './data/news/NewsApi';
import NewsHolder from './domain/entity/news/models/NewsHolder';
import FindNewsUseCase from './domain/interactors/news/FindNewsUseCase';
import NewsViewModelImpl from './presentation/view-model/news/NewsViewModelImpl';
import NewsComponent from './presentation/view/news/NewsComponent';
import ArticleHolder from './domain/entity/article/models/ArticleHolder';
import ArticleViewModelImpl from './presentation/view-model/article/ArticleViewModelImpl';

function App() {
  // data layer
  const authRepository = new AuthFakeApi();
  const newsRRepository = new NewsApi()
  // domain layer
  const homeHolder = new HomeHolder();
  const authHolder = new AuthHolder();
  const newsHolder = new NewsHolder();
  const articleHolder = new ArticleHolder();
  const settingsUseCase = new SettingsUseCase(homeHolder);
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  const findNewsUseCase = new FindNewsUseCase(newsRRepository,newsHolder);
  // view layer
  const homeViewModel = new HomeViewModelImpl(settingsUseCase, homeHolder);
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);
  const newsViewModel = new NewsViewModelImpl(findNewsUseCase, newsHolder);
  const articleViewModel = new ArticleViewModelImpl(articleHolder);

  return (
    <HomeComponent homeViewModel={homeViewModel} authViewModel={authViewModel}>
      <NewsComponent newsViewModel={newsViewModel} articleViewModel={articleViewModel}/>
    </HomeComponent>
  );
}

export default App

