import HomeComponent from './presentation/view/home/HomeComponent';
import AuthViewModelImpl from './presentation/view-model/auth/AuthViewModelImpl';
import AuthFakeApi from './data/auth/AuthFakeApi';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import SettingsUseCase from './domain/interactors/home/SettingsUseCase';
import AuthHolder from './domain/entity/auth/models/AuthHolder';
import HomeHolder from './domain/entity/home/models/HomeHolder';
import HomeViewModelImpl from './presentation/view-model/home/HomeViewModelImpl';

function App() {
  // data layer
  const authRepository = new AuthFakeApi();
  // domain layer
  const homeHolder = new HomeHolder();
  const authHolder = new AuthHolder();
  const settingsUseCase = new SettingsUseCase(homeHolder);
  const loginUseCase = new LoginUseCase(authRepository, authHolder);

  // view layer
  const homeViewModel = new HomeViewModelImpl(settingsUseCase, homeHolder)
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

  return (
    <HomeComponent homeViewModel={homeViewModel} authViewModel={authViewModel}>
      <p>Hello World!</p>
    </HomeComponent>
  );
}

export default App
