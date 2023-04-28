export default class LocalSettings {
  static getTheme(): boolean {
    return localStorage.getItem('theme') === 'dark' || (localStorage.getItem('theme') !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches)
  }

  static setTheme(isDarkMode : boolean): void {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
}