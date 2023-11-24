export interface IGif {
  id: string;
  title: string;
  images: IImage;
}

interface IImage {
  original: ImageOriginal;
  fixed_width_small_still: ImageSmall;
}

interface ImageOriginal {
  mp4: string;
  url: string;
}

interface ImageSmall {
  url: string;
}
