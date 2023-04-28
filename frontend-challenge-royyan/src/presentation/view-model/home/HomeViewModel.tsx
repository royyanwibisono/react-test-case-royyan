import BaseViewModel from '../BaseViewModel';

export default interface HomeViewModel extends BaseViewModel {
  isDarkMode: boolean;
  darkModeString: string;

  onDarkModeChanged(isDarkMode: boolean, mode: string): void;
  onToggleThemeSwitch(): void;
}