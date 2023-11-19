import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DetailedItem from '../components/details/DetailedItem';
import App from '../App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { store } from '../store/store';
import { Provider } from 'react-redux';
import { mockResponse } from './helpers/mockRequest';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
});

describe('Tests for the Pagination component:', () => {
  test('Make sure the component updates URL query parameter when page changes.', async () => {
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
    await screen.findAllByTestId('gif');

    expect(location.pathname).toBe('/page/1');

    const pages = screen.getAllByTestId('page-number');
    await act(async () => {
      fireEvent.click(pages[1]);
    });

    expect(location.pathname).toBe('/page/2');
  });
});
