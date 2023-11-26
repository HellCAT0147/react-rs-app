import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Search from '@/components/layout/search/Search';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Search component:', () => {
  test('Verify that clicking the Search button modifies the URL with new data.', async () => {
    render(
      <Provider store={store}>
        <Search />
      </Provider>
    );

    const input: HTMLElement = screen.getByTestId('search-input');
    const submit: HTMLElement = screen.getByTestId('search-button');
    const query: string = 'bla-bla-bla';

    await userEvent.type(input, query);
    await userEvent.click(submit);

    expect(mockRouter.asPath.includes(query)).toBeTruthy();
  });
});
