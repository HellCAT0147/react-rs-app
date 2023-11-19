import { cleanup, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockResponse } from './helpers/mockRequest';
import App from '../App';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Card List component:', () => {
  test('Verify that the component renders the specified number of cards.', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    const gifs: HTMLElement[] = await screen.findAllByTestId('gif');
    expect(gifs).toHaveLength(2);
  });
});

describe('Tests for the Card List component:', () => {
  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    fetchMock.mockResponse(JSON.stringify({ data: [] }));
    cleanup();
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(
      screen.queryByText('Sorry, there is nothing to show you :(')
    ).toBeDefined();
  });
});
