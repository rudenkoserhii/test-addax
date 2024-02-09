import { Wrapper } from 'components/CalendarHeader/CalendarHeader.styled';
import { Switcher, UpDown } from 'components/CalendarHeader/components';
import { TasksFilter } from 'components/TasksFilter/TasksFilter';

export const CalendarHeader = ({
  setPrevItem,
  setNextItem,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
}) => {
  return (
    <Wrapper>
      <UpDown setPrevItem={setPrevItem} setNextItem={setNextItem} />
      <TasksFilter />
      <Switcher />
    </Wrapper>
  );
};
