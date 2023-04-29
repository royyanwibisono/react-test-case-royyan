import { fireEvent, render, screen } from "@testing-library/react"
import AuthComponent from "./AuthComponent"
import AuthViewModelImpl from "../../view-model/auth/AuthViewModelImpl"
import AuthHolder from "../../../domain/entity/auth/models/AuthHolder";
import LoginUseCase from "../../../domain/interactors/auth/LoginUseCase";
import AuthFakeApi from "../../../data/auth/AuthFakeApi";

test('expect LOGIN text on button', () => {
  const authRepository = new AuthFakeApi();
  const authHolder = new AuthHolder();
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);
  render(<AuthComponent authViewModel={authViewModel} />);
  const text = screen.getByText(/login/i);
  expect(text).toBeInTheDocument();
});

describe('AuthComponent', () => {
  it('calls onClick when button is clicked', () => {
    const authRepository = new AuthFakeApi();
    const authHolder = new AuthHolder();
    const loginUseCase = new LoginUseCase(authRepository, authHolder);
    const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);
    
    authViewModel.onShowModal = jest.fn(); // create a mock function
    render(<AuthComponent authViewModel={authViewModel} />);

    fireEvent.click(screen.getByText(('LOGIN'))); // simulate a button click

    expect(authViewModel.onShowModal).toHaveBeenCalledTimes(1); // check if onClickMock was called
  });
});