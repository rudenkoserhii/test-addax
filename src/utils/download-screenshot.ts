import Notiflix from 'notiflix';

export function downloadScreenshot(elementId: string, fileName: string) {
  const element: HTMLElement | null = document.getElementById(elementId);

  if (
    !(element instanceof HTMLImageElement) &&
    !(element instanceof HTMLCanvasElement) &&
    !(element instanceof HTMLVideoElement) &&
  ) {
    Notiflix.Notify.failure(`Element with ID "${elementId}" is not a valid image source.`);
    return;
  }
  const canvas = document.createElement('canvas');

  canvas.width = element?.offsetWidth;
  canvas.height = element?.offsetHeight;

  const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

  context?.drawImage(element as CanvasImageSource, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL('image/png');

  const link = document.createElement('a');

  link.href = dataUrl;
  link.download = fileName || 'screenshot.png';

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
}
