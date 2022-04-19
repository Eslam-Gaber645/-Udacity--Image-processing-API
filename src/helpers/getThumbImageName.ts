'use strict';

export default function getThumbImageName({
  imgName,
  imgExt,
  width,
  height,
}: GetThumbImageNameOptions): string {
  return (
    imgName +
    (width ? `_width-${width}` : '') +
    (height ? `_height-${height}` : '') +
    imgExt
  );
}
