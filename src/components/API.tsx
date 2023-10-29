import { Component, ReactNode } from 'react';
import APIItem from './APIItem';
import { QueryState, IAPIItem } from '../types';

class API extends Component<QueryState> {
  public render(): ReactNode {
    const data: IAPIItem[] = this.props.data;
    console.log(data);

    return (
      <section className="api">
        {data.map((item) => (
          <APIItem title={item.title} images={item.images} key={item.id} />
        ))}
      </section>
    );
  }
}

export default API;
