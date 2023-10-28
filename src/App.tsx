import { Component, ReactNode } from 'react';
import Search from './components/Search';
import API from './components/API';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Search />
        <API />
      </>
    );
  }
}

export default App;
