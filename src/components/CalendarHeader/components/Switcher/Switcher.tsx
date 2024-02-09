import { Button } from 'components/Button/Button';
import { Wrapper } from 'components/CalendarHeader/components/Switcher/Switcher.styled';

export const Switcher = () => {
  function setWeekOrMonth(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    localStorage.setItem(
      'weekOrMonth',
      event.currentTarget.getAttribute('content')?.toLowerCase() || 'month'
    );
  }

  return (
    <Wrapper>
      <Button handleClick={setWeekOrMonth} title="Set to Week" content="Week"></Button>
      <Button handleClick={setWeekOrMonth} title="Set to Month" content="Month"></Button>
    </Wrapper>
  );
};
