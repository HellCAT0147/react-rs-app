import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Pagination from '@/components/pagination/Pagination';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Pagination component:', () => {
  test('Shows controls depending from total amount of found elements.', async () => {
    const pages = 2;
    render(
      <Provider store={store}>
        <Pagination data={{ total_count: pages * 10, count: 0, offset: 0 }} />
      </Provider>
    );

    expect(screen.getAllByTestId('page-number')[1].textContent).toBe('2');
  });
});
