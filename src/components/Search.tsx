import { Component, ReactNode } from 'react';
import axios from 'axios';
import { PropsPlug, SearchState } from '../types';

class Search extends Component {
  public state: SearchState;
  public constructor(props: PropsPlug) {
    super(props);
    const localData: string | null = localStorage.getItem('searchKeys');
    this.state = {
      searchResult: localData ?? 'Search result',
      searchKeys: localData ?? '',
    };
  }

  private catchEnter(key: string): void {
    if (key === 'Enter') {
      this.search();
    }
  }

  private search = async (): Promise<void> => {
    const cleanQuery: string = this.state.searchKeys.trim();
    this.setState({ searchResult: cleanQuery });
    localStorage.setItem('searchKeys', cleanQuery);
    console.log(
      await axios({
        url: 'https://api.giphy.com/v1/gifs/search',
        params: {
          api_key: 'wc4t6jVyKwNgIYR7NvQq0RB70uN94Dl1',
          q: cleanQuery,
          limit: 20,
        },
      })
    );
  };

  private typing = (text: string): void => {
    this.setState({ searchKeys: text });
  };

  public render(): ReactNode {
    return (
      <section className="search">
        <input
          type="text"
          onChange={(event) => this.typing(event.target.value)}
          onKeyDown={(event) => this.catchEnter(event.key)}
          value={this.state.searchKeys}
        />
        <button onClick={this.search}>Search</button>
        <h1 className="query">{this.state.searchResult.toUpperCase()}</h1>
      </section>
    );
  }
}

export default Search;
