import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import { mockResponse } from './helpers/mockRequest';
import Search from '../components/Search';
import userEvent from '@testing-library/user-event';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { store } from '../store/store';
import { Provider } from 'react-redux';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(JSON.stringify(mockResponse));
});

describe('Tests for the Search component:', () => {
  test('Verify that clicking the Search button saves the entered value to the local storage.', async () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <Search />
        </Provider>
      </MemoryRouter>
    );

    const input: HTMLElement = screen.getByTestId('search-input');
    const submit: HTMLElement = screen.getByTestId('search-button');
    const query: string = 'bla-bla-bla';

    await userEvent.type(input, query);
    await userEvent.click(submit);

    expect(localStorage.getItem('searchKeys')).toBe(query);
  });

  test('Check that the component retrieves the value from the local storage upon mounting.', async () => {
    const query: string = 'bla-bla-bla';
    localStorage.setItem('searchKeys', JSON.stringify(query));

    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    const input: HTMLInputElement = screen.getByTestId('search-input');
    expect(input.value.replace(/"/g, '')).toBe(query);
  });
});
