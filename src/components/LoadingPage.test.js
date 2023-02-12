import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage';

describe('LoadingPage', () => {
  it('should render a loading spinner and text', () => {
    render(<LoadingPage />);
    expect(screen.getByText('Bank.ly')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });
});