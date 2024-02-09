import {
  Button,
  IconImportStyled,
} from 'components/CalendarHeader/components/Import/Import.styled';
import { useSelector } from 'react-redux';
import { filterValue } from 'store/filter/selectors';
import { getTasks } from 'store/tasks/operations';
import { downloadJSON } from 'utils';
// import { saveAs } from 'file-saver';
// var FileSaver = require('file-saver');
// import { getWeek } from 'utils/get-week';

export const Import = () => {
  const tasks = useSelector(getTasks);
  const filter = useSelector(filterValue);

  return (
    <Button
      type="button"
      onClick={() => downloadJSON({ a: 'string', b: 'string' })}
      title="Save Calendar as JSON"
    >
      <IconImportStyled />
    </Button>
  );
};
