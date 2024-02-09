import { Button } from 'components/Button/Button';
import { Wrapper } from './UpDown.styled';
import arrowUp from 'assets/icons/arrow-up.svg';
import arrowDown from 'assets/icons/arrow-down.svg';
// import { getWeek } from 'utils/get-week';

export const UpDown = ({
  setPrevItem,
  setNextItem,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
}) => {
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth() + 1;
  //   const currentWeek = getWeek(new Date());
  const weekOrMonth = localStorage.getItem('weekOrMonth') || 'month';
  //   const selectedWeekOrMonth = localStorage.getItem('selectedWeekOrMonth')
  //     ? localStorage.getItem('selectedWeekOrMonth')?.split(' ')[0]
  //     : weekOrMonth === 'week'
  //       ? currentWeek
  //       : currentMonth;
  //   const selectedYear = localStorage.getItem('selectedWeekOrMonth')
  //     ? localStorage.getItem('selectedWeekOrMonth')?.split(' ')[1]
  //     : currentYear;
  //     const disabled =
  //       currentYear === selectedYear && weekOrMonth === 'week'
  //         ? Number(selectedWeekOrMonth) === currentWeek
  //         : Number(selectedWeekOrMonth) === currentMonth;

  return (
    <Wrapper>
      <Button handleClick={setPrevItem} title={`Previous ${weekOrMonth}`}>
        {arrowUp}
      </Button>
      <Button handleClick={setNextItem} title={`Next ${weekOrMonth}`}>
        {arrowDown}
      </Button>
    </Wrapper>
  );
};
