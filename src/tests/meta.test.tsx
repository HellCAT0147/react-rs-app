import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Meta from '@/components/seo/Meta';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Meta component:', () => {
  test('Test conditions for robots analytics.', async () => {
    render(
      <Provider store={store}>
        <Meta title="thugs life" description="" />
      </Provider>
    );
    expect(screen.findByTestId('robots')).toBeDefined();
  });
});
