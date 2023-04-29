import axios from 'axios';
import NewsRepository from '../../domain/repository/news/NewsRepository';
import CheckArgsResult from '../../domain/entity/news/structures/CheckArgsResult';
import NewsApiUtils from '../../presentation/util/NewsApiUtils';
import NewsResult from '../../domain/entity/news/structures/NewsResult';

export default class NewsApi implements NewsRepository {
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
    const param = keyword.length> 0? {
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      q: keyword,
      pageSize,
      page,
    } : sources.length > 0 ? {
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      sources,
      pageSize,
      page,
    } : {
      apiKey: process.env.REACT_APP_NEWS_API_KEY,
      country,
      category,
      pageSize,
      page,
    }
    return new Promise((resolve, reject) => {
      if (!isValid){
        reject(new Error('Invalid input.'));
        return;
      }

      axios
      .get(NewsApiUtils.getEndPoint(keyword), {
        params: param,
      })
      .then((response) => {
        resolve(response.data as NewsResult);
      })
      .catch((error) => {
        if (!error.response.data){
          reject(new Error(`Unable to fetch news data: ${error.message}.`));
          return;
        }
        resolve(error.response.data as NewsResult);
      });
    });
  }
}