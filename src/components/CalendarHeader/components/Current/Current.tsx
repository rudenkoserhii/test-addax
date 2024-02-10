import {
  Wrapper,
  InputWeek,
  InputYear,
  Select,
  Text,
} from 'components/CalendarHeader/components/Current/Current.styled';
import { monthNames } from 'enums';
import { WeekOrMonth } from 'types';

type CurrentProp = {
  currentWeekOrMonth: WeekOrMonth;
  setCurrentWeekOrMonth: (weekOrMonth: WeekOrMonth) => void;
  weekOrMonth: string;
};

export const Current = ({
  currentWeekOrMonth,
  setCurrentWeekOrMonth,
  weekOrMonth,
}: CurrentProp) => {
  const isWeek = weekOrMonth.toLowerCase() === 'week';

  const getMonthNumber = (monthName: string): number => monthNames.indexOf(monthName) + 1;

  const handleInputChange = (value: number | string) => {
    let updatedValue: WeekOrMonth;

    if (isWeek) {
      updatedValue = { ...currentWeekOrMonth, weekOrMonth: value as number };
    } else {
      updatedValue = {
        ...currentWeekOrMonth,
        weekOrMonth: getMonthNumber(value as string) as number,
      };
    }
    setCurrentWeekOrMonth(updatedValue);
  };

  const renderMonthOptions = () =>
    monthNames.map((month, index) => (
      <option key={index} value={month}>
        {month}
      </option>
    ));

  return (
    <Wrapper>
      {isWeek ? (
        <>
          <InputWeek
            type="number"
            placeholder="Select Week..."
            min={1}
            max={53}
            value={currentWeekOrMonth.weekOrMonth}
            onChange={(event) => handleInputChange(Number(event.target.value))}
          />
          <Text>th week</Text>
        </>
      ) : (
        <Select
          value={monthNames[currentWeekOrMonth.weekOrMonth - 1]}
          onChange={(event) => handleInputChange(event.target.value)}
        >
          {renderMonthOptions()}
        </Select>
      )}
      <InputYear
        type="number"
        placeholder="Select Year..."
        value={currentWeekOrMonth.year}
        onChange={(event) =>
          setCurrentWeekOrMonth({ ...currentWeekOrMonth, year: Number(event.target.value) })
        }
      />
    </Wrapper>
  );
};
