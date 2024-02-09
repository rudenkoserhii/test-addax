import { Wrapper } from 'components/CalendarHeader/CalendarHeader.styled';
import { Switcher, UpDown } from 'components/CalendarHeader/components';
import { TasksFilter } from 'components/TasksFilter/TasksFilter';
import { useState } from 'react';

export const CalendarHeader = ({
  setPrevItem,
  setNextItem,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
}) => {
  const [weekOrMonth, setWeekOrMonth] = useState<string>('month');

  return (
    <Wrapper>
      <UpDown setPrevItem={setPrevItem} setNextItem={setNextItem} weekOrMonth={weekOrMonth} />
      <TasksFilter />
      <Switcher setWeekOrMonthUp={(value) => setWeekOrMonth(value)} />
    </Wrapper>
  );
};
