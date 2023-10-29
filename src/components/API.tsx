import { Component, ReactNode } from 'react';
import APIItem from './APIItem';
import { QueryState, IAPIItem } from '../types';

class API extends Component<QueryState> {
  public render(): ReactNode {
    if (this.props.isLoading) {
      return (
        <section className="api">
          <h2>Loading...</h2>
        </section>
      );
    } else if (this.props.data) {
      const data: IAPIItem[] = this.props.data;
      return (
        <section className="api">
          {data.map((item) => (
            <APIItem title={item.title} images={item.images} key={item.id} />
          ))}
        </section>
      );
    } else {
      <section className="api">Unexpected error</section>;
    }
  }
}

export default API;
