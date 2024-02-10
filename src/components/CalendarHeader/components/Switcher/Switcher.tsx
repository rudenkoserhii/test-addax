import { Button } from 'components/Button/Button';
import { Wrapper } from 'components/CalendarHeader/components/Switcher/Switcher.styled';

export const Switcher = ({ setWeekOrMonth }: { setWeekOrMonth: (value: string) => void }) => {
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    localStorage.setItem('weekOrMonth', event.currentTarget.innerText.toLowerCase() || 'month');
    setWeekOrMonth(event.currentTarget.innerText);
  }

  return (
    <Wrapper>
      <Button
        handleClick={handleClick}
        title="Set to Week"
        content="Week"
        active={localStorage.getItem('weekOrMonth') === 'week'}
      ></Button>
      <Button
        handleClick={handleClick}
        title="Set to Month"
        content="Month"
        active={localStorage.getItem('weekOrMonth') === 'month'}
      ></Button>
    </Wrapper>
  );
};
