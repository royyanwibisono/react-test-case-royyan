import CheckArgsResult from "../../entity/news/structures/CheckArgsResult";
import NewsResult from "../../entity/news/structures/NewsResult";


export default interface NewsRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateInputArgs(country: string, category: string, sources: string, keyword: string): Promise<CheckArgsResult>;

  /**
   * @throws {Error} if credentials have not passed
   */
  getTopHeadline(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<NewsResult>;
}