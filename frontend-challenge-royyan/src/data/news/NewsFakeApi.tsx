import NewsRepository from '../../domain/repository/news/NewsRepository';
import CheckArgsResult from '../../domain/entity/news/structures/CheckArgsResult';
import NewsApiUtils from '../../presentation/util/NewsApiUtils';
import NewsResult, { Article } from '../../domain/entity/news/structures/NewsResult';

export default class NewsFakeApi implements NewsRepository {
  private articles: Article[];
  public constructor(articles: Article[]){
    this.articles = articles
  }
  /**
   * @throws {Error} if validation has not passed
   */
  validateInputArgs(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<CheckArgsResult> {
    return new Promise((resolve, reject) => {

      //rules from news API ducumentation
      if (country !== "" && sources !== "" && keyword === ""){
        reject(new Error("You can't mix 'country' param with the 'sources' param. "));
        return;
      }

      if (category !== "" && sources !== "" && keyword === ""){
        reject(new Error("You can't mix 'category' param with the 'sources' param. "));
        return;
      }

      if (!NewsApiUtils.isCountryValid(country) && keyword === "") {
        reject(new Error('Invalid country: ' + country + '.'));
        return;
      }

      if (keyword.length > 100){
        reject(new Error('Keyword to long, max 100 chars.'));
        return;
      }

      if (pageSize <1){
        reject(new Error('Page size must be greater than 0.'));
        return;
      }

      if (page <1){
        reject(new Error('Page size must be greater than 0.'));
        return;
      }

      resolve({
        valid: true,
      });
    });
  }

  /**
   * @throws {Error} if credentials have not passed
   */
  getNewsQuery(isValid: boolean, country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<NewsResult>
  {
    return new Promise((resolve, reject) => {
      if (isValid){
        resolve({
          status: "ok",
          totalResults: this.articles.length,
          articles: this.articles,
          code : "",
          message: "",
        });
      }

      else{
        resolve({
          status: "error",
          totalResults: 0,
          articles: [],
          code : "badRequest",
          message: "failed to get articles",
        });
      }
    });
  }
}