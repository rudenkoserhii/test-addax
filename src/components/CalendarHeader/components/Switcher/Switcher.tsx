import { Button } from 'components/Button/Button';
import { Wrapper } from 'components/CalendarHeader/components/Switcher/Switcher.styled';

export const Switcher = ({ setWeekOrMonthUp }: { setWeekOrMonthUp: (value: string) => void }) => {
  function setWeekOrMonth(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    localStorage.setItem('weekOrMonth', event.currentTarget.innerText.toLowerCase() || 'month');
    setWeekOrMonthUp(event.currentTarget.innerText);
  }

  return (
    <Wrapper>
      <Button handleClick={setWeekOrMonth} title="Set to Week" content="Week"></Button>
      <Button handleClick={setWeekOrMonth} title="Set to Month" content="Month"></Button>
    </Wrapper>
  );
};
