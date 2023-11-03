import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginContext } from './context.js';
import Login from './login.jsx';

describe('Login Component', () => {
  it('renders login form when not logged in', () => {
    const state = {
      loggedIn: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const { getByPlaceholderText } = render(
      <LoginContext.Provider value={state}>
        <Login />
      </LoginContext.Provider>
    );

    expect(getByPlaceholderText('UserName')).toBeInTheDocument();
    expect(getByPlaceholderText('password')).toBeInTheDocument();
  });

  it('renders logout button when logged in', () => {
    const state = {
      loggedIn: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const { getByText } = render(
      <LoginContext.Provider value={state}>
        <Login />
      </LoginContext.Provider>
    );

    expect(getByText('Log Out')).toBeInTheDocument();
  });

  it('calls login function with username and password on form submit', () => {
    const state = {
      loggedIn: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    const { getByPlaceholderText, getByText } = render(
      <LoginContext.Provider value={state}>
        <Login />
      </LoginContext.Provider>
    );

    fireEvent.change(getByPlaceholderText('UserName'), { target: { value: 'testuser' } });
    fireEvent.change(getByPlaceholderText('password'), { target: { value: 'testpass' } });
    fireEvent.click(getByText('Login'));

    expect(state.login).toHaveBeenCalledWith('testuser', 'testpass');
  });
});