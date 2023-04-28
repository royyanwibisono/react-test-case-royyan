import HomeHolder from "../../../domain/entity/home/models/HomeHolder";
import HomeListener from "../../../domain/entity/home/models/HomeListener";
import SettingsUseCase from "../../../domain/interactors/home/SettingsUseCase";
import BaseView from "../../view/BaseView";
import HomeViewModel from "./HomeViewModel";

export default class HomeViewModelImpl implements HomeViewModel, HomeListener {
  public isDarkMode: boolean;
  public darkModeString: string;

  private baseView?: BaseView;
  private settingsUseCase: SettingsUseCase;
  private homeHolder: HomeHolder;

  public constructor(settingsUseCase: SettingsUseCase, homeHolder: HomeHolder) {
    this.isDarkMode = homeHolder.isDarkMode();
    this.darkModeString = homeHolder.getMode()

    this.settingsUseCase = settingsUseCase;
    this.homeHolder = homeHolder;

    this.homeHolder.addHomeListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public onHomeChanged = (): void => {
    this.isDarkMode = this.homeHolder.isDarkMode();
    this.darkModeString = this.homeHolder.getMode()

    this.notifyViewAboutChanges();
  };

  public onDarkModeChanged = (isDarkMode: boolean, mode: string): void =>{
    this.isDarkMode = isDarkMode;
    this.darkModeString = mode;
    this.notifyViewAboutChanges();
  };

  public onToggleThemeSwitch = (): void => {
    this.settingsUseCase.setDarkModeUser(!this.isDarkMode);
    this.notifyViewAboutChanges();
  };

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}