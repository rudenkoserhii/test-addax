import { colors } from 'enums';
import {
  InputStyled,
  IconSearchStyled,
  LabelStyled,
  Button,
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
  const [color, setColor] = useState<string>('black');
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
      <ButtonColor type="button" data-color={color}>
        <SelectStyled
          onChange={(event) => {
            console.log((event.target as HTMLInputElement).value);
            setColor((event.target as HTMLInputElement).value);
            dispatch(addColor((event.target as HTMLInputElement).value));
          }}
        >
          {colors.map((color) => (
            <>
              <InputRadio
                type="radio"
                value={color.name}
                id={color.hexCode}
                name="color"
                data-color={color.hexCode}
              />
              <Option
                data-color={color.hexCode}
                key={nanoid()}
                htmlFor={color.hexCode}
                className={color.hexCode}
                onClick={(event) => {
                  if (
                    ((event.target as HTMLLabelElement).previousSibling as HTMLInputElement)
                      ?.checked
                  ) {
                    setColor('black');
                    (
                      (event.target as HTMLLabelElement).previousSibling as HTMLInputElement
                    )?.removeAttribute('checked');
                  }
                }}
              ></Option>
            </>
          ))}
        </SelectStyled>
      </ButtonColor>
    </LabelStyled>
  );
};
