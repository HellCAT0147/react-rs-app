import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ErrorBoundary from '@/components/error/ErrorBoundary';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the ErrorBoundary component:', () => {
  test('ErrorBoundary message appears.', async () => {
    render(
      <Provider store={store}>
        <ErrorBoundary />
      </Provider>
    );
    expect(
      screen.findByText('Managed error. It is ok, just refresh the page :)')
    ).toBeDefined();
  });
});
