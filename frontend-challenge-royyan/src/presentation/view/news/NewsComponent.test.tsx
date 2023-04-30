import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import NewsComponent from "./NewsComponent";
import NewsFakeApi from "../../../data/news/NewsFakeApi";
import NewsHolder from "../../../domain/entity/news/models/NewsHolder";
import FindNewsUseCase from "../../../domain/interactors/news/FindNewsUseCase";
import NewsViewModelImpl from "../../view-model/news/NewsViewModelImpl";
import ArticleHolder from "../../../domain/entity/article/models/ArticleHolder";
import ArticleViewModelImpl from "../../view-model/article/ArticleViewModelImpl";

const articles = [
  {
    source: { name: "Source 1", id: "Source 1"},
    author: "Author 1",
    title: "Title 1",
    description: "Description 1",
    url: "https://example.com/1",
    urlToImage: "https://example.com/1.jpg",
    publishedAt: "2023-01-01T00:00:00Z",
    content: "Content 1",
  },
  {
    source: { name: "Source 2", id: "Source 2"},
    author: "Author 2",
    title: "Title 2",
    description: "Description 2",
    url: "https://example.com/2",
    urlToImage: "https://example.com/2.jpg",
    publishedAt: "2023-01-02T00:00:00Z",
    content: "Content 2",
  },
  {
    source: { name: "Source 3", id: "Source 3"},
    author: "Author 3",
    title: "Title 3",
    description: "Description 3",
    url: "https://example.com/3",
    urlToImage: "https://example.com/3.jpg",
    publishedAt: "2023-01-02T00:00:00Z",
    content: "Content 3",
  },
]
describe("NewsComponent", () => {
  const newsRepository = new NewsFakeApi(articles)
  const newsHolder = new NewsHolder();
  const findNewsUseCase = new FindNewsUseCase(newsRepository,newsHolder);
  const newsViewModel = new NewsViewModelImpl(findNewsUseCase, newsHolder);

  const articleHolder = new ArticleHolder();
  const articleViewModel = new ArticleViewModelImpl(articleHolder);
  articleViewModel.onShowArticle = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render news articles", async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {render(
        <NewsComponent
          newsViewModel={newsViewModel}
          articleViewModel={articleViewModel}
        />
      );
    });

    expect(screen.getByText("Title 1")).toBeInTheDocument();
    expect(screen.getByText("Title 2")).toBeInTheDocument();
    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Source 2")).toBeInTheDocument();

    expect(screen.getByText(/business/i)).toBeInTheDocument();
    expect(screen.getByText(/entertainment/i)).toBeInTheDocument();
    expect(screen.getByText(/general/i)).toBeInTheDocument();
    expect(screen.getByText(/health/i)).toBeInTheDocument();
    expect(screen.getByText(/science/i)).toBeInTheDocument();
    expect(screen.getByText(/sports/i)).toBeInTheDocument();
    expect(screen.getByText(/technology/i)).toBeInTheDocument();

    expect(screen.getByRole(/combobox/i)).toBeInTheDocument();

  });

  it('handles input changes correctly', async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {render(
        <NewsComponent
          newsViewModel={newsViewModel}
          articleViewModel={articleViewModel}
        />
      );
    });

    // Simulate a user typing in the search input
    const input = screen.getByPlaceholderText('Search articles');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');

    // Simulate a user selecting an option in the select element
    const select = screen.getByRole('combobox');
      // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      fireEvent.change(select, { target: { value: 'us' } });
    });

    expect(screen.getByTitle('us')).toBeInTheDocument();

  });
    
});

test('check show article', async () => {
  const newsRepository = new NewsFakeApi(articles)
  const newsHolder = new NewsHolder();
  const findNewsUseCase = new FindNewsUseCase(newsRepository,newsHolder);
  const newsViewModel = new NewsViewModelImpl(findNewsUseCase, newsHolder);

  const articleHolder = new ArticleHolder();
  const articleViewModel = new ArticleViewModelImpl(articleHolder);

  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {render(
      <NewsComponent
        newsViewModel={newsViewModel}
        articleViewModel={articleViewModel}
      />
    );
  });

  expect(screen.getByText("Title 1")).toBeInTheDocument();

  fireEvent.click(screen.getByText("Title 1"));

  const containerElement = screen.getByRole('acontainer');
  expect(containerElement).toBeInTheDocument();
  
});
