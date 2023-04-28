import HomeHolder from '../../entity/home/models/HomeHolder';

export default class SettingsUseCase {
  private _homeHolder: HomeHolder;

  public constructor(homeHolder: HomeHolder) {
    this._homeHolder = homeHolder;
  }

  public setDarkModeUser(isDarkMode : boolean) {
    this._homeHolder.onDarkModeChange(isDarkMode);
  }
}