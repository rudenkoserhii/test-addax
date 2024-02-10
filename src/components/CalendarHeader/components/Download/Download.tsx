import {
  Button,
  IconPhotoStyled,
} from 'components/CalendarHeader/components/Download/Download.styled';
import { downloadScreenshot } from 'utils';

export const Download = () => (
  <Button
    type="button"
    onClick={() => downloadScreenshot('screenshot', 'myCalendar.png')}
    title="Save Calendar as Image"
  >
    <IconPhotoStyled />
  </Button>
);
