import { Component, ReactNode } from 'react';
import { APIItemProps } from '../types';

class APIItem extends Component<APIItemProps> {
  public constructor(props: APIItemProps) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div>
        <h3>{this.props.title}</h3>
        <video src={this.props.src} autoPlay loop muted></video>
      </div>
    );
  }
}

export default APIItem;
