import React from 'react';
import { act, render, screen } from '@testing-library/react';
import App, { LOADING_DELAY_MS } from './App';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('renders currency converter title', () => {
  render(<App />);
  const titleElement = screen.getByText(/conversor de moedas/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders skeleton cards while page is loading', () => {
  render(<App />);
  expect(screen.getAllByTestId('conversor-skeleton')).toHaveLength(6);
});

test('renders all configured currency pairs after loading', () => {
  render(<App />);

  act(() => {
    jest.advanceTimersByTime(LOADING_DELAY_MS + 50);
  });

  expect(screen.getByText(/USD para BRL/i)).toBeInTheDocument();
  expect(screen.getByText(/BRL para USD/i)).toBeInTheDocument();
  expect(screen.getByText(/CAD para BRL/i)).toBeInTheDocument();
  expect(screen.getByText(/BRL para CAD/i)).toBeInTheDocument();
  expect(screen.getByText(/EUR para BRL/i)).toBeInTheDocument();
  expect(screen.getByText(/BRL para EUR/i)).toBeInTheDocument();
});
