import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockResponse } from './helpers/mockRequest';
import {
  BrowserRouter,
  MemoryRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { IGif } from '../utils/types';
import { act } from 'react-dom/test-utils';
import App from '../App';
import DetailedItem from '../components/details/DetailedItem';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Card component:', () => {
  test('Ensure that the card component renders the relevant card data.', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    const mockGif: IGif = mockResponse.data[0];
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText(mockGif.title)).toBeDefined();
  });

  test('Validate that clicking on a card opens a detailed card component.', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    render(
      <MemoryRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('detailed-item')).toBeNull();

    const renderedGifs = await screen.findAllByTestId('gif');
    await act(async () => {
      fireEvent.click(renderedGifs[0]);
    });

    expect(screen.queryByTestId('detailed-item')).toBeDefined();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information.', async () => {
    fetchMock.mockResponse(JSON.stringify(mockResponse));
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page/" element={<App />}>
              <Route path="details/:id" element={<DetailedItem />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    );
    expect(history.length).toBe(3);
    const renderedGifs = await screen.findAllByTestId('gif');
    await act(async () => {
      fireEvent.click(renderedGifs[0]);
    });
    expect(history.length).toBe(4);
  });
});
