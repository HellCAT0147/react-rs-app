import { Component, ReactNode } from 'react';

class Search extends Component {
  public state = {
    searchResult: 'Search result',
    searchKeys: '',
  };

  private search = (): void => {
    this.setState({ searchResult: this.state.searchKeys });
  };

  private typing = (text: string): void => {
    this.setState({ searchKeys: text });
  };

  public render(): ReactNode {
    return (
      <section>
        <h1>{this.state.searchResult}</h1>
        <input
          type="text"
          onChange={(event) => this.typing(event.target.value)}
        />
        <button onClick={this.search}>Search</button>
      </section>
    );
  }
}

export default Search;
