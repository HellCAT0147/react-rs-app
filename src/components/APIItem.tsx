import { APIItemProps } from '../types';

export default function APIItem(props: APIItemProps): JSX.Element {
  return (
    <div className="api-item">
      <h3 className="item-title">{props.title}</h3>
      <video
        className="item-content"
        poster={props.images.fixed_width_small_still.url}
        src={props.images.original.mp4}
        autoPlay
        loop
        muted
      ></video>
    </div>
  );
}
