import { colors } from 'enums';
import {
  InputStyled,
  LabelStyled,
  SelectStyled,
  Option,
  InputRadio,
  ButtonColor,
} from './TasksFilter.styled';
import { useDispatch } from 'react-redux';
import { addColor, addFilter } from 'store/filter/slice';
import { AppDispatch } from 'store/store';
import { nanoid } from 'nanoid';
import { useState } from 'react';

export const TasksFilter = (): JSX.Element => {
  const [color, setColor] = useState<string>('empty');
  const dispatch: AppDispatch = useDispatch();

  return (
    <LabelStyled>
      <InputStyled
        type="text"
        name="filter"
        placeholder="Find tasks by name or label color"
        onChange={(event) => {
          dispatch(addFilter(event.currentTarget.value));
        }}
      />
      <ButtonColor type="button" data-color={color} title="Select label color">
        <SelectStyled
          onChange={(event) => {
            setColor((event.target as HTMLInputElement).value);
            dispatch(addColor((event.target as HTMLInputElement).value));
          }}
        >
          {colors.map(({ name, hexCode }) => (
            <Option
              title={name.replace(name[0], name[0].toUpperCase())}
              key={nanoid()}
              data-color={hexCode}
              data-checked={name === color}
              htmlFor={hexCode}
              className={hexCode}
              onClick={(event) => {
                if (
                  ((event.currentTarget as HTMLLabelElement).firstChild as HTMLInputElement)
                    ?.value === color
                ) {
                  setColor('empty');

                  (
                    (event.currentTarget as HTMLLabelElement).firstChild as HTMLInputElement
                  )?.removeAttribute('checked');
                  dispatch(addColor(''));
                }
              }}
            >
              <InputRadio
                type="radio"
                value={name}
                id={hexCode}
                name="color"
                data-color={hexCode}
              />
            </Option>
          ))}
        </SelectStyled>
      </ButtonColor>
    </LabelStyled>
  );
};
