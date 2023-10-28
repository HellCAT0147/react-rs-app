import { Component, ReactNode } from 'react';
import { APIState, PropsPlug } from '../types';
import APIItem from './APIItem';

class API extends Component {
  public state: APIState;
  public constructor(props: PropsPlug) {
    super(props);
    this.state = {
      APIItems: [
        {
          key: 1,
          title: 'Gif 1',
          src: 'https://media0.giphy.com/media/l1L2UkgpuiE4U/giphy.mp4?cid=bd4c490cqj5u0m3ixyvdw0af5b539lyecvzcaq2fnw9zwqz1&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
        },
        {
          key: 2,
          title: 'Gif 2',
          src: 'https://media0.giphy.com/media/l1L2UkgpuiE4U/giphy.mp4?cid=bd4c490cqj5u0m3ixyvdw0af5b539lyecvzcaq2fnw9zwqz1&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
        },
        {
          key: 3,
          title: 'Gif 3',
          src: 'https://media0.giphy.com/media/l1L2UkgpuiE4U/giphy.mp4?cid=bd4c490cqj5u0m3ixyvdw0af5b539lyecvzcaq2fnw9zwqz1&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
        },
        {
          key: 4,
          title: 'Gif 4',
          src: 'https://media0.giphy.com/media/l1L2UkgpuiE4U/giphy.mp4?cid=bd4c490cqj5u0m3ixyvdw0af5b539lyecvzcaq2fnw9zwqz1&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
        },
        {
          key: 5,
          title: 'Gif 5',
          src: 'https://media0.giphy.com/media/l1L2UkgpuiE4U/giphy.mp4?cid=bd4c490cqj5u0m3ixyvdw0af5b539lyecvzcaq2fnw9zwqz1&ep=v1_gifs_search&rid=giphy.mp4&ct=g',
        },
      ],
    };
  }

  public render(): ReactNode {
    return (
      <section className="api">
        {this.state.APIItems.map((item) => (
          <APIItem title={item.title} src={item.src} key={item.key} />
        ))}
      </section>
    );
  }
}

export default API;
