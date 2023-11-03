import React from 'react';
import { render } from '@testing-library/react';
import { LoginContext } from './context.js';
import Auth from './auth.jsx';

describe('Auth Component', () => {
  it('renders children when loggedIn is true and user has capability', () => {
    const state = {
      loggedIn: true,
      can: (capability) => capability === 'read',
    };

    const { getByText } = render(
      <LoginContext.Provider value={state}>
        <Auth capability="read">
          <div>Test Content</div>
        </Auth>
      </LoginContext.Provider>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render children when loggedIn is false', () => {
    const state = {
      loggedIn: false,
      can: (capability) => capability === 'read',
    };

    const { queryByText } = render(
      <LoginContext.Provider value={state}>
        <Auth capability="read">
          <div>Test Content</div>
        </Auth>
      </LoginContext.Provider>
    );

    expect(queryByText('Test Content')).toBeNull();
  });

  it('does not render children when user lacks capability', () => {
    const state = {
      loggedIn: true,
      can: (capability) => capability === 'write',
    };

    const { queryByText } = render(
      <LoginContext.Provider value={state}>
        <Auth capability="read">
          <div>Test Content</div>
        </Auth>
      </LoginContext.Provider>
    );

    expect(queryByText('Test Content')).toBeNull();
  });
});