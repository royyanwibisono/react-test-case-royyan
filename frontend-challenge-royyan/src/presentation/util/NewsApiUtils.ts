export default class NewsApiUtils {
  static getCountryList(): string[] {
    return ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
  }

  static getCategoryList(): string[] {
    return ["business", "entertainment", "general", "health", "science", "sports", "technology"]
  }

  static isCountryValid(country : string): boolean {
    return this.getCountryList().includes(country)
  }

  static getEndPoint(keyword: string): string {
    // return "https://newsapi.org/v2/top-headlines"
    return keyword.length > 0 ? "https://newsapi.org/v2/everything" : "https://newsapi.org/v2/top-headlines"
  }
}