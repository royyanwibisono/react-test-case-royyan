import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ArticleComponent from './ArticleComponent';
import ArticleViewModelImpl from '../../view-model/article/ArticleViewModelImpl';
import ArticleHolder from '../../../domain/entity/article/models/ArticleHolder';

const articleHolder = new ArticleHolder()
const mockArticleViewModel = new ArticleViewModelImpl(articleHolder);

mockArticleViewModel.onUpdateArticle(
  {id: "testId", name: "testing"},
  "royyan",
  "this is title", 
  "this is description", 
  "https://example.com", 
  "image.jpg",
  "2023",
  "this is content");

const onclose = jest.fn();

describe('ArticleComponent', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<ArticleComponent articleViewModel={mockArticleViewModel} onCloseButtonClicked={onclose}/>);
    act(()=>mockArticleViewModel.onShowArticle(true));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the article title', () => {
    const title = screen.getByText(mockArticleViewModel.title);
    expect(title).toBeInTheDocument();
  });

  it('renders the article description', () => {
    const description = screen.getByText(mockArticleViewModel.description);
    expect(description).toBeInTheDocument();
  });

  it('renders the article author', () => {
    const author = screen.getByText(/Author:/);
    expect(author).toBeInTheDocument();
  });

  it('renders the article source', () => {
    const source = screen.getByText(/Source:/);
    expect(source).toBeInTheDocument();
  });

  it('renders the article published date', () => {
    const publishedAt = screen.getByText(/Published:/);
    expect(publishedAt).toBeInTheDocument();
  });

  it('renders the article content', () => {
    const content = screen.getByText(mockArticleViewModel.content);
    expect(content).toBeInTheDocument();
  });

  it('renders the continue reading button', () => {
    const continueReadingButton = screen.getByRole('continuereading');
    expect(continueReadingButton).toHaveTextContent("Continue reading...");
  });

  it('calls the onCloseButtonClicked callback when the close button is clicked', () => {
    const closeButton = screen.getByRole('button', { name: /CLOSE/ });
    closeButton.click();
    expect(onclose).toHaveBeenCalled();
  });
});
