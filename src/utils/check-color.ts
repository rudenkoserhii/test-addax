import { colors } from 'enums';
import { Task } from 'types';

export function checkColor(label: Task['label'], filterByColor: string): boolean {
  if (!label) {
    return true;
  }
  if (filterByColor === '') {
    return true;
  } else {
    return label.some(
      ({ color }) => colors.find(({ name }) => name === filterByColor)?.hexCode === color
    );
  }
}
