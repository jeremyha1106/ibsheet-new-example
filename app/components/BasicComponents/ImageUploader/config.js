// const options = {
//     maxSizeMB: number,          // (default: Number.POSITIVE_INFINITY)
//     maxWidthOrHeight: number,   // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
//     useWebWorker: boolean,      // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
//     maxIteration: number,       // optional, max number of iteration to compress the image (default: 10)
//     exifOrientation: number,    // optional, see https://stackoverflow.com/a/32490603/10395024
//     onProgress: Function,       // optional, a function takes one progress argument (percentage from 0 to 100)
//     fileType: string            // optional, fileType override
//   }

const compressedThumbnailOption = {
  maxSizeMB: 1,
  maxWidthOrHeight: 72,
  useWebWorker: true,
};
const compressedOption = {
  maxSizeMB: 1,
  maxWidthOrHeight: 200,
  useWebWorker: true,
};

export { compressedOption, compressedThumbnailOption };
