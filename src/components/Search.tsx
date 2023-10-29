import { Component, ReactNode } from 'react';
import { FindTagProps, SearchState } from '../types';

class Search extends Component<FindTagProps> {
  public state: SearchState;
  public constructor(props: FindTagProps) {
    super(props);
    const localData: string | null = localStorage.getItem('searchKeys');
    this.state = {
      searchResult: localData ?? 'Search result',
      searchKeys: localData ?? '',
    };
  }

  componentDidMount(): void {
    this.search();
  }

  private catchEnter(key: string): void {
    if (key === 'Enter') this.search();
  }

  private search = async (): Promise<void> => {
    const cleanQuery: string = this.state.searchKeys.trim();
    this.setState({ searchResult: cleanQuery });
    localStorage.setItem('searchKeys', cleanQuery);
    this.props.getGif(cleanQuery);
  };

  private typing = (text: string): void => {
    this.setState({ searchKeys: text });
  };

  public render(): ReactNode {
    return (
      <section className="search">
        <input
          className="input-search"
          type="text"
          onChange={(event) => this.typing(event.target.value)}
          onKeyDown={(event) => this.catchEnter(event.key)}
          value={this.state.searchKeys}
        />
        <button className="send-button" onClick={this.search}>
          Search
        </button>
        <h1 className="query">{this.state.searchResult.toUpperCase()}</h1>
      </section>
    );
  }
}

export default Search;
