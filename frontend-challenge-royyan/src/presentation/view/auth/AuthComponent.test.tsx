import { fireEvent, render, screen } from "@testing-library/react"
import AuthComponent from "./AuthComponent"
import AuthViewModelImpl from "../../view-model/auth/AuthViewModelImpl"
import AuthHolder from "../../../domain/entity/auth/models/AuthHolder";
import LoginUseCase from "../../../domain/interactors/auth/LoginUseCase";
import AuthFakeApi from "../../../data/auth/AuthFakeApi";

const authRepository = new AuthFakeApi();
const authHolder = new AuthHolder();
const loginUseCase = new LoginUseCase(authRepository, authHolder);
const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

describe('AuthComponent', () => {
  it('calls onClick when button is clicked', () => {
    let tmp = authViewModel.onShowModal;
    authViewModel.onShowModal = jest.fn(); // create a mock function
    render(<AuthComponent authViewModel={authViewModel} />);

    fireEvent.click(screen.getByText(('LOGIN'))); // simulate a button click

    expect(authViewModel.onShowModal).toHaveBeenCalledTimes(1); // check if onClickMock was called
    authViewModel.onShowModal = tmp;
  });
});

test('expect LOGIN text on button', () => {
  render(<AuthComponent authViewModel={authViewModel} />);
  const text = screen.getByText(/login/i);
  expect(text).toBeInTheDocument();
});

test('expect login form', () => {
  render(<AuthComponent authViewModel={authViewModel} />);

  fireEvent.click(screen.getByText((/login/i)));
  
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