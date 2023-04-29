import NewsHolder from "../../entity/news/models/NewsHolder";
import NewsRepository from "../../repository/news/NewsRepository";

export default class FindNewsUseCase {
  private newsRepository: NewsRepository;
  private newsHolder: NewsHolder;

  public constructor(newsRepository: NewsRepository, newsHolder: NewsHolder) {
    this.newsRepository = newsRepository;
    this.newsHolder = newsHolder;
  }

  /**
   * @throws {Error} if credentials are not valid or have not passed
   */
  public async searchNews(country: string, category: string, sources: string, keyword: string, pageSize: number, page: number): Promise<void> {
    const validationResult = await this.newsRepository.validateInputArgs(country,category,sources,keyword,pageSize,page);
    const newsResult = await this.newsRepository.getNewsQuery(validationResult.valid, country,category,sources,keyword,pageSize,page);

    this.newsHolder.onUpdateNews(newsResult.status,newsResult.totalResults,newsResult.articles, newsResult.code, newsResult.message);
  }
}