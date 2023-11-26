import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import DetailedGif from '@/components/detailed-gif/DetailedGif';
import { mockResponseWithId } from './helpers/mockResponseWithId';
import { act } from 'react-dom/test-utils';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Detailed Card component:', () => {
  test('Make sure the detailed card component correctly displays the detailed card data.', async () => {
    render(
      <Provider store={store}>
        <DetailedGif gif={mockResponseWithId.data} />
      </Provider>
    );
    await screen.findByTestId('detailed-item');
    const details = screen.getByTestId('detailed-item');
    expect(details.getElementsByTagName('h2')[0].textContent).toBe(
      mockResponseWithId.data.title
    );
  });

  test('Ensure that clicking the close button hides the component.', async () => {
    render(
      <Provider store={store}>
        <DetailedGif gif={mockResponseWithId.data} />
      </Provider>
    );
    expect(await screen.findByTestId('detailed-item')).toBeDefined();
    expect(screen.queryByTestId('detailed-item')).not.toBeNull();
    const closeButton = await screen.findByTestId('close');
    await act(async () => {
      fireEvent.click(closeButton);
    });
    expect(screen.queryByTestId('detailеd-item')).toBeNull();
  });
});
