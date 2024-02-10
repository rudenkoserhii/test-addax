import html2canvas from 'html2canvas';
import Notiflix from 'notiflix';

export function downloadScreenshot(elementId: string, fileName?: string): void {
  const element = document.getElementById(elementId);

  if (!element) {
    Notiflix.Notify.failure(`Element with ID "${elementId}" not found.`);

    return;
  }

  html2canvas(element).then((canvas) => {
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');

    link.href = dataUrl;
    link.download = fileName || 'downloaded_image.png';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
