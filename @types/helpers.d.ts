interface FileNameSplitter {
  basename: string;
  ext: string;
}

interface GetThumbImageNameOptions {
  imgName: string;
  imgExt: string;
  width?: number;
  height?: number;
}

interface ResizeImageOptions {
  width?: number;
  height?: number;
  inputPath: string;
  outputPath: string;
}
