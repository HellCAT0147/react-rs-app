import { Component, ReactNode } from 'react';
import { IAPIItem } from '../types';

class APIItem extends Component<IAPIItem> {
  public constructor(props: IAPIItem) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div className="api-item">
        <h3>{this.props.title}</h3>
        <video
          poster={this.props.images.fixed_width_small_still.url}
          src={this.props.images.original.mp4}
          autoPlay
          loop
          muted
        ></video>
      </div>
    );
  }
}

export default APIItem;
