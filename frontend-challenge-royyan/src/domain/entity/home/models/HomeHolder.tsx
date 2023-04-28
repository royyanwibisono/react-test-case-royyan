import LocalSettings from '../../../../presentation/util/LocalSettings';
import HomeListener from './HomeListener';

export default class HomeHolder {
  private _homeListeners: HomeListener[];
  private _isDarkMode: boolean;
  private _modeString: string;

  public constructor() {
    this._isDarkMode = LocalSettings.getTheme();
    this._modeString = this._isDarkMode ? 'dark' : 'light';
    this._homeListeners = [];
  }

  public onDarkModeChange(isDarkMode: boolean): void {
    this._isDarkMode = isDarkMode;
    this._modeString = this._isDarkMode ? 'dark' : 'light';
    LocalSettings.setTheme(isDarkMode);
    this.notifyListeners();
  }

  public isDarkMode(): boolean {
    return this._isDarkMode;
  }

  public getMode(): string {
    return this._modeString;
  }

  public addHomeListener(homeListener: HomeListener): void {
    this._homeListeners.push(homeListener);
  }

  public removeHomeListener(homeListener: HomeListener): void {
    this._homeListeners.splice(this._homeListeners.indexOf(homeListener), 1);
  }

  private notifyListeners(): void {
    this._homeListeners.forEach((listener) => listener.onHomeChanged());
  }
}