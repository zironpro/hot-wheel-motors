/**
 * Utility functions for HTML5 Canvas cover calculations, DPR handling,
 * and frame URL formatting.
 */

/**
 * Formats a frame number with zero-padding (e.g. 1 -> "0001").
 */
export function padFrameIndex(index: number, length: number = 4): string {
  return String(index).padStart(length, "0");
}

/**
 * Constructs the URL for a sequence frame.
 */
export function getFrameUrl(
  folderPath: string,
  filePrefix: string,
  index: number,
  extension: string = "webp",
  padLength: number = 4
): string {
  const padded = padFrameIndex(index, padLength);
  const cleanFolder = folderPath.replace(/\/+$/, "");
  return `${cleanFolder}/${filePrefix}${padded}.${extension}`;
}

export interface DrawRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Calculates cover positioning (similar to CSS background-size: cover)
 * maintaining aspect ratio and center cropping.
 */
export function calculateAspectCover(
  containerWidth: number,
  containerHeight: number,
  imageWidth: number,
  imageHeight: number
): DrawRect {
  if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) {
    return { x: 0, y: 0, width: containerWidth, height: containerHeight };
  }

  const containerRatio = containerWidth / containerHeight;
  const imageRatio = imageWidth / imageHeight;

  let renderWidth: number;
  let renderHeight: number;

  if (containerRatio > imageRatio) {
    renderWidth = containerWidth;
    renderHeight = containerWidth / imageRatio;
  } else {
    renderHeight = containerHeight;
    renderWidth = containerHeight * imageRatio;
  }

  const x = (containerWidth - renderWidth) / 2;
  const y = (containerHeight - renderHeight) / 2;

  return {
    x,
    y,
    width: renderWidth,
    height: renderHeight,
  };
}

/**
 * Renders an image to canvas with cover math and Retina (dpr) scaling support.
 */
export function renderImageToCanvas(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cssWidth: number,
  cssHeight: number,
  dpr: number = 1
): void {
  const canvas = ctx.canvas;

  // Adjust physical resolution for Retina display if needed
  const targetPhysicalWidth = Math.floor(cssWidth * dpr);
  const targetPhysicalHeight = Math.floor(cssHeight * dpr);

  if (canvas.width !== targetPhysicalWidth || canvas.height !== targetPhysicalHeight) {
    canvas.width = targetPhysicalWidth;
    canvas.height = targetPhysicalHeight;
  }

  // Save state and set CSS dimensions
  ctx.save();
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssWidth, cssHeight);

  // Calculate cover dimensions
  const rect = calculateAspectCover(cssWidth, cssHeight, img.naturalWidth || img.width, img.naturalHeight || img.height);

  // Draw crisp image
  ctx.drawImage(img, rect.x, rect.y, rect.width, rect.height);
  ctx.restore();
}
