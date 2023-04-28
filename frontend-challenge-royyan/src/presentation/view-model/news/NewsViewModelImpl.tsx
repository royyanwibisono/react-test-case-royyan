import NewsHolder from "../../../domain/entity/news/models/NewsHolder";
import NewsListener from "../../../domain/entity/news/models/NewsListener";
import NewsViewModel from "./NewsViewModel";

export default class NewsViewModelImpl implements NewsViewModel, NewsListener {
  public country: string;
  public category: string;
  public sources: string;
  public keyword: string;
  public pageSize: number;
  public page: number

  public isShowError: boolean;
  public errorMessage: string;
 
  public status: string;
  public totalResults: number;
  public articles: unknown;

  private baseView?: BaseView;
  private loginUseCase: LoginUseCase;
  private authHolder: AuthHolder;

  public constructor(loginUseCase: LoginUseCase, newsHolder: NewsHolder) {
    this.country = 'id';
    this.category = "";
    this.sources = "";
    this.keyword = "";
    this.pageSize = 20;
    this.page = 0

    this.isShowError = false;
    this.errorMessage = '';

    status: string;
    totalResults: number;
    articles: unknown;

    this.loginUseCase = loginUseCase;
    this.authHolder = authHolder;

    this.authHolder.addAuthListener(this);

    this.visible = false;
    this.onClose = null;
    this.confirmLoading = false;
  }

  public onHandleCancel = (): void => {
    this.visible = false;
    if (this.onClose) {
      this.onClose();
    }
    this.notifyViewAboutChanges();
  }

  public onShowModal = (): void => {
    this.visible = true;
    this.notifyViewAboutChanges();
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public onAuthChanged = (): void => {
    console.log("onAuthChanged")
    if (this.authHolder.isUserAuthorized()) {
      this.isSignInButtonVisible = false;
      this.isSignOutButtonVisible = true;
      this.authStatus = 'authorized';
      this.isAuthStatusPositive = true;
    } else {
      this.isSignInButtonVisible = true;
      this.isSignOutButtonVisible = false;
      this.authStatus = 'is not autorized';
      this.isAuthStatusPositive = false;
    }

    this.notifyViewAboutChanges();
  };

  public onEmailQueryChanged = (loginQuery: string): void => {
    this.emailQuery = loginQuery;
    this.notifyViewAboutChanges();
  };

  public onPasswordQueryChanged = (passwordQuery: string): void => {
    this.passwordQuery = passwordQuery;
    this.notifyViewAboutChanges();
  };

  public onClickSignIn = async (): Promise<void> => {
    if (!this.validateLoginForm()) {
      this.notifyViewAboutChanges();
      return;
    }

    try {
      await this.loginUseCase.loginUser(this.emailQuery, this.passwordQuery);
      this.isShowError = false;
      this.errorMessage = '';
    } catch (e : any) {
      this.errorMessage = e.message;
      this.isShowError = true;
    }

    this.notifyViewAboutChanges();
  };

  public onClickSignOut = (): void => {
    this.authHolder.onSignedOut();
  };

  private validateLoginForm = (): boolean => {
    if (!this.emailQuery) {
      this.isShowError = true;
      this.errorMessage = 'Email cannot be empty';
      return false;
    }
    if (this.errorMessage === 'Email cannot be empty') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    if (!FormValidator.isValidEmail(this.emailQuery)) {
      this.isShowError = true;
      this.errorMessage = 'Email format is not valid';
      return false;
    }
    if (this.errorMessage === 'Email format is not valid') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    if (!this.passwordQuery) {
      this.isShowError = true;
      this.errorMessage = 'Password cannot be empty';
      return false;
    }
    if (this.errorMessage === 'Password cannot be empty') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    return true;
  }

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}