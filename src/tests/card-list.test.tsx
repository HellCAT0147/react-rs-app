import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { mockResponse } from './helpers/mockResponse';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Gifs from '@/components/gifs/Gifs';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Card List component:', () => {
  test('Verify that the component renders the specified number of cards.', async () => {
    render(
      <Provider store={store}>
        <Gifs data={mockResponse.data} />
      </Provider>
    );
    const gifs: HTMLElement[] = await screen.findAllByTestId('gif');
    expect(gifs).toHaveLength(2);
    expect(gifs).not.toHaveLength(3);
  });
});

describe('Tests for the Card List component:', () => {
  test('Check that an appropriate message is displayed if no cards are present.', async () => {
    fetchMock.mockResponse(JSON.stringify({ data: [] }));
    render(
      <Provider store={store}>
        <Gifs data={[]} />
      </Provider>
    );
    const message: HTMLElement = await screen.findByText(
      'Sorry, there is nothing to show you :('
    );
    expect(message).toBeDefined();
  });
});
