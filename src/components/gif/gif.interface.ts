export interface IGif {
  id: string;
  title: string;
  images: IImage;
}

interface IImage {
  original: { mp4: string; url: string };
  fixed_width_small_still: { url: string };
}
