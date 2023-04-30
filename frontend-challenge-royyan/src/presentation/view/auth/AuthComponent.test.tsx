import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import AuthComponent from "./AuthComponent"
import AuthViewModelImpl from "../../view-model/auth/AuthViewModelImpl"
import AuthHolder from "../../../domain/entity/auth/models/AuthHolder";
import LoginUseCase from "../../../domain/interactors/auth/LoginUseCase";
import AuthFakeApi from "../../../data/auth/AuthFakeApi";
import userEvent from "@testing-library/user-event";

const authRepository = new AuthFakeApi();
const authHolder = new AuthHolder();
const loginUseCase = new LoginUseCase(authRepository, authHolder);
const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

describe('AuthComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  it('should have LOGIN text on button', () => {
    render(<AuthComponent authViewModel={authViewModel} />);
    const text = screen.getByText(/login/i);
    expect(text).toBeInTheDocument();
  });

  it('opens the login modal on button click', () => {
    render(<AuthComponent authViewModel={authViewModel} />);
    fireEvent.click(screen.getByRole('btnshowlogin'));
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('shows the email input field', () => {
    render(<AuthComponent authViewModel={authViewModel} />);
    fireEvent.click(screen.getByRole('btnshowlogin'));
    expect(screen.getByRole('authinputuname')).toBeInTheDocument();
  });

  it('shows the password input field', () => {
    render(<AuthComponent authViewModel={authViewModel} />);
    fireEvent.click(screen.getByRole('btnshowlogin'));
    expect(screen.getByRole('authinputpwd')).toBeInTheDocument();
  });

  it('shows the sign in button', () => {
    render(<AuthComponent authViewModel={authViewModel} />);
    fireEvent.click(screen.getByRole('btnshowlogin'));
    expect(screen.getByRole('btnsignin')).toBeInTheDocument();
  });

  it('shows the sign out button', () => {
    authViewModel.isSignOutButtonVisible = true;
    render(<AuthComponent authViewModel={authViewModel} />);
    fireEvent.click(screen.getByRole('btnshowlogin'));
    expect(screen.getByRole('btnsignout')).toBeInTheDocument();
  });
  
  it('calls onClick when button is clicked', () => {
    let tmp = authViewModel.onShowModal;
    authViewModel.onShowModal = jest.fn(); // create a mock function
    render(<AuthComponent authViewModel={authViewModel} />);

    fireEvent.click(screen.getByText(('LOGIN'))); // simulate a button click

    expect(authViewModel.onShowModal).toHaveBeenCalledTimes(1); // check if onClickMock was called
    authViewModel.onShowModal = tmp;
  });
});

test('expect login form', () => {
  render(<AuthComponent authViewModel={authViewModel} />);

  fireEvent.click(screen.getByRole("btnshowlogin"));
  
  const text = screen.getByText("Login");
  expect(text).toBeInTheDocument();

  expect(screen.getByRole("authstatus")).toBeInTheDocument();
  expect(screen.getByRole("authinputuname")).toBeInTheDocument();
  expect(screen.getByRole("authinputpwd")).toBeInTheDocument();
  expect(() => {
    expect(screen.getByRole("autherrormsg")).toBeInTheDocument();
  }).toThrowError();
  expect(screen.getByRole("btnsignin")).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: /Sign out/i })).not.toBeInTheDocument();
});

test('expect login unauthorized', () => {
  render(<AuthComponent authViewModel={authViewModel} />);

  fireEvent.click(screen.getByRole("btnshowlogin"));
  
  const text = screen.getByText("Login");
  expect(text).toBeInTheDocument();

  fireEvent.click(screen.getByRole("btnsignin"));

  expect(screen.getByRole("autherrormsg")).toBeInTheDocument();

  const errorMessage = screen.getByText('Email cannot be empty');
  expect(errorMessage).toBeInTheDocument();

});

test('expect Email format is not valid', async () => {
  render(<AuthComponent authViewModel={authViewModel} />);

  const emailInput = screen.getByRole('authinputuname');

  // Prompt the email and password inputs
  await userEvent.type(emailInput, 'user.example.com');
  
  const signInButton = screen.getByRole('btnsignin');
  userEvent.click(signInButton);

  // Verify that the error message is not visible yet
  const errorMessage = screen.getByRole('autherrormsg');
  expect(errorMessage).not.toBeVisible();

  // Wait for the state changes to occur
  await waitFor(() => {
    expect(errorMessage).toHaveTextContent('Email format is not valid');
  });

});

test('expect Password cannot be empty', async () => {
  render(<AuthComponent authViewModel={authViewModel} />);

  const emailInput = screen.getByRole('authinputuname');

  // Prompt the email and password inputs
  await userEvent.type(emailInput, 'user@email.com');
  
  const signInButton = screen.getByRole('btnsignin');
  userEvent.click(signInButton);

  // Verify that the error message is not visible yet
  const errorMessage = screen.getByRole('autherrormsg');
  expect(errorMessage).not.toBeVisible();

  // Wait for the state changes to occur
  await waitFor(() => {
    expect(errorMessage).toHaveTextContent('Password cannot be empty');
  });

});