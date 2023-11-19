import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import DetailedItem from '../components/details/DetailedItem';
import App from '../App';
import { MemoryRouter, Navigate, Route, Routes } from 'react-router-dom';
import React from 'react';
import { mockResponseWithId } from './helpers/mockRequestWithId';
import { act } from 'react-dom/test-utils';
import createFetchMock, { FetchMock } from 'vitest-fetch-mock';
import { store } from '../store/store';
import { Provider } from 'react-redux';

const fetchMock: FetchMock = createFetchMock(vi);
fetchMock.enableMocks();

beforeEach((): void => {
  fetchMock.resetMocks();
  fetchMock.mockResponse(JSON.stringify(mockResponseWithId));
});

describe('Tests for the Detailed Card component:', () => {
  test('Check that a loading indicator is displayed while fetching data.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page/" element={<App />}>
              <Route path="details/:id" element={<DetailedItem />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('loading')).toBeDefined();
  });

  test('Make sure the detailed card component correctly displays the detailed card data.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page/" element={<App />}>
              <Route path="details/:id" element={<DetailedItem />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    await screen.findByTestId('detailed-item');
    const details = screen.getByTestId('detailed-item');
    expect(details.getElementsByTagName('h2')[0].textContent).toBe(
      mockResponseWithId.data.title
    );
  });

  test('Ensure that clicking the close button hides the component.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/JIX9t2j0ZTN9S']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page/" element={<App />}>
              <Route path="details/:id" element={<DetailedItem />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    expect(await screen.findByTestId('detailed-item')).toBeDefined();
    expect(screen.queryByTestId('detailed-item')).not.toBeNull();
    const closeButton = await screen.findByTestId('close');
    await act(async () => {
      fireEvent.click(closeButton);
    });
    expect(screen.queryByTestId('detailed-item')).toBeNull();
  });

  test('Request to undefined gif returns an error.', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1/details/asd']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Navigate to="/page/1" />} />
            <Route path="/page/:page/" element={<App />}>
              <Route path="details/:id" element={<DetailedItem />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    expect(
      screen.queryByText('Sorry, there is nothing to show you :(')
    ).toBeDefined();
    expect(screen.queryByText('Empty fake request')).toBeNull();
  });
});
