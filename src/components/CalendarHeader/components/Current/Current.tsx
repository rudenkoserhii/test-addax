import {
  Wrapper,
  InputWeek,
  InputYear,
  Select,
  Text,
  Option,
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
    console.log('handlechange');
    let updatedValue: WeekOrMonth;

    if (isWeek) {
      updatedValue = { ...currentWeekOrMonth, weekOrMonth: value as number };
      localStorage.setItem('savedWeekOrMonth', `${updatedValue.weekOrMonth} ${updatedValue.year}`);
    } else {
      updatedValue = {
        ...currentWeekOrMonth,
        weekOrMonth: getMonthNumber(value as string) as number,
      };
      localStorage.setItem('savedWeekOrMonth', `${updatedValue.weekOrMonth} ${updatedValue.year}`);
    }
    setCurrentWeekOrMonth(updatedValue);
  };

  const renderMonthOptions = () =>
    monthNames.map((month, index) => (
      <Option key={index} value={month}>
        {month}
      </Option>
    ));

  return (
    <Wrapper>
      {isWeek ? (
        <>
          <InputWeek
            title="Select Week"
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
          title="Select Month"
          value={monthNames[currentWeekOrMonth.weekOrMonth - 1]}
          onChange={(event) => handleInputChange(event.target.value)}
        >
          {renderMonthOptions()}
        </Select>
      )}
      <InputYear
        title="Select Year"
        type="number"
        placeholder="Select Year..."
        value={currentWeekOrMonth.year}
        onChange={(event) => {
          localStorage.setItem(
            'savedWeekOrMonth',
            `${currentWeekOrMonth.weekOrMonth} ${Number(event.target.value)}`
          );
          setCurrentWeekOrMonth({
            weekOrMonth: currentWeekOrMonth.weekOrMonth,
            year: Number(event.target.value),
          });
        }}
      />
    </Wrapper>
  );
};
