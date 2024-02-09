export function downloadJSON(object: { a: string; b: string }) {
  const jsonData = JSON.stringify({ object }, null, 2);

  const blob = new Blob([jsonData], { type: 'application/json' });
  const link = document.createElement('a');

  link.download = 'calendar.json';

  link.href = URL.createObjectURL(blob);

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
