import { Component, ReactNode } from 'react';
import APIItem from './APIItem';
import { QueryState, IAPIItem } from '../types';

class API extends Component<QueryState> {
  public render(): ReactNode {
    if (this.props.isLoading) {
      return (
        <section className="api">
          <span className="loader"></span>
        </section>
      );
    } else if (this.props.data) {
      const data: IAPIItem[] = this.props.data;

      return (
        <section className="api">
          {data.length ? (
            data.map((item) => (
              <APIItem title={item.title} images={item.images} key={item.id} />
            ))
          ) : (
            <h2>Sorry, there is nothing to show you :(</h2>
          )}
        </section>
      );
    } else {
      <section className="api">Unexpected error</section>;
    }
  }
}

export default API;
