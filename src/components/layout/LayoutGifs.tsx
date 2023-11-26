import { FC, PropsWithChildren } from 'react';
import Gifs from '../gifs/Gifs';
import { IGifs } from '../gifs/gifs.interface';

const LayoutGifs: FC<PropsWithChildren<IGifs>> = ({ children, data }) => {
  return <Gifs data={data}>{children}</Gifs>;
};

export default LayoutGifs;
