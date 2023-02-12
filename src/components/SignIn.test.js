import React from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/rootReducer';
import { storeUser } from '../actions/actionCreators';


const mockStore = configureStore({reducer: rootReducer});

describe('Login Page', () => {
  it('should render', () => {
    let setToken = () => {};
    mockStore.dispatch(storeUser())
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <SignIn setToken={setToken} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});