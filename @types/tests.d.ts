interface TestData {
  invalid: {
    imgName: string;
    width: number | string;
    height: number | string;
  };
  valid: {
    imgName: string;
    width: number;
    height: number;
    originalImgsDir: string;
    thumbImgsDir: string;
    get originalImgPath(): string;
    calcThumbImgPath(options?: { width?: true; height?: true }): string;
  };
}
