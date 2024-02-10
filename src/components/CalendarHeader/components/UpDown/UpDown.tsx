import { Button } from 'components/Button/Button';
import { Wrapper, IconArrowUpStyled, IconArrowDownStyled } from './UpDown.styled';
// import { getWeek } from 'utils/get-week';

export const UpDown = ({
  setPrevItem,
  setNextItem,
  weekOrMonth,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
  weekOrMonth: string;
}) => (
  //   const currentYear = new Date().getFullYear();
  //   const currentMonth = new Date().getMonth() + 1;
  //   const currentWeek = getWeek(new Date());
  // const weekOrMonth = localStorage.getItem('weekOrMonth') || 'month';
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

  <Wrapper>
    <Button
      handleClick={setPrevItem}
      title={`Previous ${weekOrMonth}`}
      Icon={IconArrowUpStyled}
      w={6}
    />
    <Button
      handleClick={setNextItem}
      title={`Next ${weekOrMonth}`}
      Icon={IconArrowDownStyled}
      w={6}
    />
  </Wrapper>
);
