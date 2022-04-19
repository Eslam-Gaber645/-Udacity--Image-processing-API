'use strict';

export default function fileNameSplitter(filename: string): SplittingFileName {
  let ext: string;
  const basename: string = filename.replace(
    /.\w+$/,
    (originalExt: string) => ((ext = originalExt), '')
  );

  ext ??= '';

  return {
    basename,
    ext,
  };
}
