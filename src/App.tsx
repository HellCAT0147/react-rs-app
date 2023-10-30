import { Component, ReactNode } from 'react';
import Search from './components/Search';
import API from './components/API';
import axios from 'axios';
import { IAPIItem, PropsPlug, QueryState, isSpecificData } from './types';
import ErrorBoundaryButton from './components/ErrorBoundaryButton';
import ErrorBoundary from './components/ErrorBoundary';

class App extends Component {
  public state: QueryState;
  public constructor(props: PropsPlug) {
    super(props);
    this.state = { data: [], isLoading: false };
  }
  getGif = async (query: string): Promise<void> => {
    this.setState({ isLoading: true });
    try {
      const response: Response = await axios({
        url: 'https://api.giphy.com/v1/gifs/search',
        params: {
          api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
          q: query || 'gif',
          limit: 20,
        },
      });
      if (response.status === 200) {
        if (
          'data' in response &&
          isSpecificData(response.data) &&
          'data' in response.data &&
          isSpecificData(response.data.data)
        ) {
          const data: IAPIItem[] = response.data.data;
          this.setState({ data });
          this.setState({ isLoading: false });
        }
      } else if (
        'message' in response &&
        typeof response.message === 'string'
      ) {
        throw new Error(response.message);
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };
  render(): ReactNode {
    return (
      <ErrorBoundary>
        <Search getGif={this.getGif} />
        <ErrorBoundaryButton />
        <API isLoading={this.state.isLoading} data={this.state.data} />
      </ErrorBoundary>
    );
  }
}

export default App;
