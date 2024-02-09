import { InputStyled, IconSearchStyled, LabelStyled, Button } from './TasksFilter.styled';
import { useDispatch } from 'react-redux';
import { addFilter } from 'store/filter/slice';
import { AppDispatch } from 'store/store';

export const TasksFilter = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <LabelStyled>
      <InputStyled
        type="text"
        name="filter"
        placeholder="Find tasks by name"
        onChange={(event) => {
          dispatch(addFilter(event.currentTarget.value));
        }}
      />
      <Button
        type="button"
        onClick={(event) => {
          console.log((event.currentTarget.parentNode?.children[0] as HTMLInputElement).value);
          dispatch(addFilter(event.currentTarget.value));
        }}
      >
        <IconSearchStyled />
      </Button>
    </LabelStyled>
  );
};
