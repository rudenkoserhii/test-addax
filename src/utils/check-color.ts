import { colors } from 'enums';
import { Task } from 'types';

export function checkColor(labels: Task['labels'], filterByColor: string): boolean {
  if (!labels) {
    return true;
  }
  if (filterByColor === '') {
    return true;
  } else {
    return labels.some(
      ({ color }) => colors.find(({ name }) => name === filterByColor)?.hexCode === color
    );
  }
}
