import CheckArgsResult from "../../entity/news/structures/CheckArgsResult";
import NewsResult from "../../entity/news/structures/NewsResult";


export default interface NewsRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateInputArgs(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<CheckArgsResult>;

  /**
   * @throws {Error} if credentials have not passed
   */
  getNewsQuery(isValid: boolean, country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<NewsResult>;
}