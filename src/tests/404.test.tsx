import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import NotFoundPage from '@/pages/404';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the 404 Page component:', () => {
  test('Ensure that the 404 message is displayed when navigating to NotFound page.', async () => {
    render(<NotFoundPage />);
    const error: HTMLElement = await screen.findByTestId('message');
    expect(error.textContent).toBe('That page cannot be found.');
  });
});
