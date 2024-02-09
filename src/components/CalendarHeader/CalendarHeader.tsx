import { Wrapper } from './CalendarHeader.styled';

export const CalendarHeader = () => {
  return (
    <Wrapper>
      <UpDown />
      <TasksFilter />
      <Switcher />
    </Wrapper>
  );
};
