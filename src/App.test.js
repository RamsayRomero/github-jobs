import React from 'react';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.mock('axios');

describe('App', () => {
  test('renders error when response fails', async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()));
    render(<App />);
    await userEvent.type(
      screen.getByPlaceholderText(/Title, companies/),
      'javascript'
    );
    await userEvent.click(screen.getByRole('button'));
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument;
  });

  test('renders error when response is not an array', async () => {
    const response = '<title>Job Listings</title>';
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
    render(<App />);
    const message = await screen.findByText(/Something went wrong/);
    expect(message).toBeInTheDocument;
  });

  test('fetches jobs from an API and displays cards', async () => {
    const response = [
      { id: '1', created_at: new Date() },
      { id: '2', created_at: new Date() },
      { id: '3', created_at: new Date() },
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: response }));
    render(<App />);
    const cards = await screen.findAllByText(/ago/);
    expect(cards).toHaveLength(3);
  });
});
