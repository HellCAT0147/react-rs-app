import { Component, ReactNode } from 'react';
import { IAPIItem } from '../types';

class APIItem extends Component<IAPIItem> {
  public constructor(props: IAPIItem) {
    super(props);
  }

  public render(): ReactNode {
    console.log(this.props);
    return (
      <div>
        <h3>{this.props.title}</h3>
        <video src={this.props.images.original.mp4} autoPlay loop muted></video>
      </div>
    );
  }
}

export default APIItem;
