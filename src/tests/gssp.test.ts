import createFetchMock from 'vitest-fetch-mock';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { mockResponse } from './helpers/mockResponse';
import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@/pages/page/[page]';
import { DataField } from '@/components/gifs/gifs.interface';
import { DetailedGif } from '@/components/detailed-gif/detailed-gif.interface';

vi.mock('@/components/main/Main', () => ({}));

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

interface mockPropsType {
  gifsData: DataField;
  gifData: DetailedGif | null;
}

async function mockGSSP(): Promise<mockPropsType> {
  fetchMocker.mockResponse(JSON.stringify(mockResponse));
  const context = {
    query: {
      query: '',
      limit: '10',
      page: '1',
    } as ParsedUrlQuery,
  };
  const mockProps: mockPropsType = {
    gifsData: mockResponse,
    gifData: null,
  };

  const value = await getServerSideProps(context as GetServerSidePropsContext);

  if ('props' in value) {
    const props = value.props as mockPropsType;
    const mockProps = {
      gifsData: props.gifsData,
      gifData: props.gifData,
    };
    return mockProps;
  }
  return mockProps;
}

describe('Tests for the getServerSideProps', (): void => {
  beforeEach((): void => {
    fetchMocker.resetMocks();
  });

  test('Validate that getServerSideProps return correct data', async (): Promise<void> => {
    fetchMocker.mockResponse(JSON.stringify(mockResponse));
    const props = await mockGSSP();
    expect(props.gifsData.data).toHaveLength(2);
    expect(props.gifsData.data).not.toHaveLength(3);
    expect(props.gifData).toBeNull();
  });
});
