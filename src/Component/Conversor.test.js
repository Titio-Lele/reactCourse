import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Conversor from './Conversor';

describe('Conversor', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('converts value when API returns a valid rate', async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        rates: { BRL: 5 }
      })
    });

    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '2' }
    });
    fireEvent.click(screen.getByRole('button', { name: /converter/i }));

    await waitFor(() => {
      expect(screen.getByText('10.00')).toBeInTheDocument();
    });
  });

  test('keeps result at 0 for empty input', async () => {
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        rates: { BRL: 5 }
      })
    });

    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.click(screen.getByRole('button', { name: /converter/i }));

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test('keeps result at 0 when API call fails', async () => {
    global.fetch.mockRejectedValue(new Error('network error'));

    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '2' }
    });
    fireEvent.click(screen.getByRole('button', { name: /converter/i }));

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });
});
