import { Title, InputStyled } from './TasksFilter.styled';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { addFilter } from 'redux/filter/slice';

export const TasksFilter = () => {
  const dispatch = useDispatch();

  const filterId = nanoid();
  return (
    <>
      <Title>Find contacts by name</Title>
      <InputStyled
        type="text"
        id={filterId}
        name="filter"
        onChange={(e) => {
          dispatch(addFilter(e.currentTarget.value));
        }}
      />
    </>
  );
};