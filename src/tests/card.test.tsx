import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { mockResponse } from './helpers/mockRequest';
import { MemoryRouter } from 'react-router-dom';
import Gif from '../components/Gif';
import { IGif } from '../utils/types';
import { act } from 'react-dom/test-utils';
import App from '../App';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import userEvent from '@testing-library/user-event';

const mockAxios = new MockAdapter(axios);

beforeEach(() => {
  mockAxios.onAny().reply(200, mockResponse);
});

afterEach(() => {
  mockAxios.resetHistory();
});

describe('Tests for the Card component:', () => {
  test('Ensure that the card component renders the relevant card data.', async () => {
    const mockGif: IGif = mockResponse.data[0];
    render(
      <MemoryRouter>
        <Gif
          gif={mockGif}
          details={{ isDetails: false, setIsDetails: () => {} }}
        />
      </MemoryRouter>
    );
    expect(screen.getByText(mockGif.title)).toBeDefined();
  });

  test('Validate that clicking on a card opens a detailed card component.', async () => {
    render(
      <MemoryRouter>
        <App />
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
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const renderedGifs = await screen.findAllByTestId('gif');

    userEvent.click(renderedGifs[0]);
    await waitFor(() => {
      expect(mockAxios.history.get.length).toBe(1);
    });
  });
});
