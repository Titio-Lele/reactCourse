import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Conversor from './Conversor';

describe('Conversor', () => {
  let dateSpy;
  let timeSpy;

  beforeEach(() => {
    global.fetch = jest.fn();
    dateSpy = jest.spyOn(Date.prototype, 'toLocaleDateString').mockReturnValue('30/03/2026');
    timeSpy = jest.spyOn(Date.prototype, 'toLocaleTimeString').mockReturnValue('14:35');
  });

  afterEach(() => {
    jest.clearAllMocks();
    dateSpy.mockRestore();
    timeSpy.mockRestore();
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

    expect(screen.getByText('30/03/2026 as 14:35')).toBeInTheDocument();
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

  test('formats typed value with local currency mask', () => {
    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.change(screen.getByRole('textbox', { name: /valor em usd/i }), {
      target: { value: '1234.5' }
    });

    expect(screen.getByRole('textbox', { name: /valor em usd/i })).toHaveValue('1.234,5');
  });

  test('keeps decimal separator editable without forcing trailing zeros', () => {
    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.change(screen.getByRole('textbox', { name: /valor em usd/i }), {
      target: { value: '1234,' }
    });

    expect(screen.getByRole('textbox', { name: /valor em usd/i })).toHaveValue('1.234,');
  });

  test('shows loading state for the card while fetching the exchange rate', async () => {
    let resolveRequest;

    global.fetch.mockResolvedValue(new Promise(resolve => {
      resolveRequest = () => resolve({
        json: jest.fn().mockResolvedValue({
          rates: { BRL: 5 }
        })
      });
    }));

    render(<Conversor moedaA='USD' moedaB='BRL' />);

    fireEvent.change(screen.getByRole('textbox', { name: /valor em usd/i }), {
      target: { value: '2' }
    });
    fireEvent.click(screen.getByRole('button', { name: /converter/i }));

    expect(screen.getByRole('button', { name: /consultando/i })).toBeDisabled();
    expect(screen.getByText(/consultando cotacao/i)).toBeInTheDocument();

    resolveRequest();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /converter/i })).not.toBeDisabled();
    });
  });
});
