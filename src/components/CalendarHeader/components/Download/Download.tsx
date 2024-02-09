import {
  Button,
  IconPhotoStyled,
} from 'components/CalendarHeader/components/Download/Download.styled';
import { downloadScreenshot } from 'utils';

export const Download = () => (
  <Button
    type="button"
    onClick={() => downloadScreenshot('canvas', 'myCalendar.png')}
    title="Save Calendar as JSON"
  >
    <IconPhotoStyled />
  </Button>
);
