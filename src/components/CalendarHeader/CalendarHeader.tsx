import { Wrapper } from 'components/CalendarHeader/CalendarHeader.styled';
import { Current, Download, Import, Switcher, UpDown } from 'components/CalendarHeader/components';
import { TasksFilter } from 'components/TasksFilter/TasksFilter';
import { WeekOrMonth } from 'types';

export const CalendarHeader = ({
  setPrevItem,
  setNextItem,
  weekOrMonth,
  setWeekOrMonth,
  currentWeekOrMonth,
  setCurrentWeekOrMonth,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
  weekOrMonth: string;
  setWeekOrMonth: (value: string) => void;

  currentWeekOrMonth: WeekOrMonth;
  setCurrentWeekOrMonth: ({ year, weekOrMonth }: WeekOrMonth) => void;
}) => (
  <Wrapper>
    <UpDown setPrevItem={setPrevItem} setNextItem={setNextItem} weekOrMonth={weekOrMonth} />
    <TasksFilter />
    <Current
      currentWeekOrMonth={currentWeekOrMonth}
      setCurrentWeekOrMonth={setCurrentWeekOrMonth}
      weekOrMonth={weekOrMonth}
    />
    <Download />
    <Import />
    <Switcher setWeekOrMonth={setWeekOrMonth} />
  </Wrapper>
);
