import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import HomeComponent from './HomeComponent';
import AuthFakeApi from '../../../data/auth/AuthFakeApi';
import HomeHolder from '../../../domain/entity/home/models/HomeHolder';
import AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import SettingsUseCase from '../../../domain/interactors/home/SettingsUseCase';
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';
import HomeViewModelImpl from '../../view-model/home/HomeViewModelImpl';
import AuthViewModelImpl from '../../view-model/auth/AuthViewModelImpl';

const authRepository = new AuthFakeApi();
const homeHolder = new HomeHolder();
const authHolder = new AuthHolder();

const settingsUseCase = new SettingsUseCase(homeHolder);
const loginUseCase = new LoginUseCase(authRepository, authHolder);

const homeViewModel = new HomeViewModelImpl(settingsUseCase, homeHolder);
const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

describe('HomeComponent', () => {
  test('renders header with title and switch', () => {
    let temp = authViewModel.onShowModal;
    authViewModel.onShowModal = jest.fn();
    
    render(
      <HomeComponent 
        homeViewModel={homeViewModel} 
        authViewModel={authViewModel}>
        <div>Test content</div>
      </HomeComponent>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('News');
    expect(screen.getByRole('link', { name: 'News' })).toHaveAttribute('href', process.env.PUBLIC_URL);
    expect(screen.getByRole('switch')).toBeInTheDocument();

    const loginButtonElement = screen.getByRole('btnshowlogin');
    expect(loginButtonElement).toHaveTextContent(/login/i);
    
    fireEvent.click(loginButtonElement);

    expect(authViewModel.onShowModal).toHaveBeenCalled();
    authViewModel.onShowModal = temp;
    
  });
});

test('calls onToggleThemeSwitch when switch is clicked', () => {
  let temp = homeViewModel.onToggleThemeSwitch;
  homeViewModel.onToggleThemeSwitch = jest.fn();

  render(
    <HomeComponent 
      homeViewModel={homeViewModel} 
      authViewModel={authViewModel}>
      <div>Test content</div>
    </HomeComponent>
  );

  const switchElement = screen.getByRole('switch');
  expect(homeViewModel.onToggleThemeSwitch).not.toHaveBeenCalled();

  fireEvent.click(switchElement);
  expect(homeViewModel.onToggleThemeSwitch).toHaveBeenCalledTimes(1);

  homeViewModel.onToggleThemeSwitch = temp;
});

test('check dark-mode or light-mode class to container when switch is toggled', async () => {
  render(
    <HomeComponent 
      homeViewModel={homeViewModel} 
      authViewModel={authViewModel}>
      <div>Test content</div>
    </HomeComponent>
  );

  const isDarkMode = homeViewModel.isDarkMode;

  const containerElement = screen.getByRole('container');
  expect(containerElement).toHaveClass(isDarkMode? 'dark-mode':'light-mode');

  const switchElement = screen.getByRole('switch');
  fireEvent.click(switchElement);

  await new Promise(resolve => setTimeout(resolve, 2000));

  expect(containerElement).toHaveClass(!isDarkMode? 'dark-mode':'light-mode');
});



