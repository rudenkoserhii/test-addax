import styled from 'styled-components';
import back from 'assets/images/button_color.png';
import { ReactComponent as TaskNewIcon } from 'assets/icons/calendar-new.svg';
import { ReactComponent as TaskEditIcon } from 'assets/icons/calendar-edit.svg';
import { ReactComponent as TaskDeleteIcon } from 'assets/icons/calendar-remove.svg';

export const IconNewTaskStyled = styled(TaskNewIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const IconEditTaskStyled = styled(TaskEditIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const IconDeleteTaskStyled = styled(TaskDeleteIcon)`
  height: ${(p) => p.theme.space[5]}px;
  width: auto;
`;

export const Button = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
  transition: all 200ms ease-in;
  height: ${(p) => p.theme.space[5]}px;

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(p) => p.theme.space[3]}px;
  z-index: 120;
  & > svg > path {
    fill: ${(p) => p.theme.colors.grey};
    transition: all 200ms ease-in;
  }
  &:hover {
    & > svg > path {
      transition: all 200ms ease-in;

      fill: ${(p) => p.theme.colors.blue};
    }
  }
  &:disabled {
    opacity: 0.5;
    &:hover {
      & > svg > path {
        fill: ${(p) => p.theme.colors.grey};
      }
    }
    &:hover > span {
      transition: all 200ms ease-in;
      visibility: visible;
    }
  }
`;
export const Span = styled.span`
  visibility: hidden;
  position: absolute;
  top: -20px;
  right: 0;

  transition: all 200ms ease-in;

  white-space: nowrap;
  color: ${(p) => p.theme.colors.red};
  font-size: ${(p) => p.theme.fontSizes.xs};

  &.label-edit {
    left: 0;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;

  width: 50vw;
  max-height: 80vh;
  height: fit-content;

  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  border-radius: ${(p) => p.theme.radii.normal};
  background-color: ${(p) => p.theme.colors.white};

  padding: ${(p) => p.theme.space[4]}px;
  border-radius: ${(p) => p.theme.radii.normal};
`;

export const LabelStyled = styled.label<{ 'data-index': string }>`
  position: relative;
  z-index: ${(p) => (p['data-index'] !== '' ? Number(p['data-index']) : 'auto')};
  display: flex;
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.space[4]}px;
`;

export const ButtonStyled = styled.button`
  width: ${(p) => p.theme.space[8]}px;

  border: none;
  font: inherit;
  cursor: pointer;
  outline: none;
  margin: 0 auto;
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.lightblue};
  color: ${(p) => p.theme.colors.white};

  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colors.blue};
  }

  &:active {
    ${(p) => p.theme.shadows.second};
  }
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`;

export const FormStyled = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${(p) => p.theme.space[2]}px;
  margin-bottom: ${(p) => p.theme.space[4]}px;
`;

export const InputStyled = styled.input`
  padding: ${(p) => p.theme.space[3]}px;
  border: ${(p) => p.theme.borders.dark};
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;

  &.label-edit {
    padding-right: ${(p) => p.theme.space[11]}px;
  }
`;

export const Placeholder = styled.div`
  visibility: hidden;
  position: absolute;
  top: -${(p) => p.theme.space[14]}px;
  left: ${(p) => p.theme.space[3]}px;
  z-index: 120;
  flex-grow: 1;
  margin: 0;
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  color: ${(p) => p.theme.colors.grey};
  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  background: linear-gradient(
    to bottom,
    transparent,
    transparent 50%,
    ${(p) => p.theme.colors.white} 50%,
    ${(p) => p.theme.colors.white}
  );
  background-size: 100% 100%;
`;

export const ButtonColor = styled.button<{ 'data-color': string | undefined }>`
  all: unset;
  appearance: none;
  cursor: pointer;
  background-image: ${(p) => p['data-color'] === 'empty' && `url(${back})`};
  background-size: ${(p) => p.theme.space[5]}px ${(p) => p.theme.space[5]}px;
  background-color: ${(p) => (p['data-color'] === 'empty' ? 'transparent' : p['data-color'])};
  height: ${(p) => p.theme.space[5]}px;
  width: ${(p) => p.theme.space[5]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: ${(p) => p.theme.space[10]}px;
  transition: all 200ms ease-in;
  &:hover {
    & > fieldset {
      transition: all 200ms ease-in;
      visibility: visible;
    }
  }
`;
export const SelectStyled = styled.fieldset`
  visibility: hidden;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: calc(${(p) => p.theme.space[5]}px * 4 + ${(p) => p.theme.space[2]}px * 3);
  width: calc(${(p) => p.theme.space[5]}px * 4 + ${(p) => p.theme.space[2]}px * 3);
  gap: ${(p) => p.theme.space[2]}px;
  padding: ${(p) => p.theme.space[3]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  transition: all 200ms ease-in;
`;

export const Option = styled.label<{ 'data-color': string; 'data-checked': boolean }>`
  position: relative;
  cursor: pointer;
  height: ${(p) => p.theme.space[5]}px;
  width: ${(p) => p.theme.space[5]}px;
  background-color: ${(p) => p['data-color']};
  border-radius: ${(p) => p.theme.radii.normal};
  outline: ${(p) =>
    p['data-checked'] ? `${p.theme.space[2]}px solid ${p.theme.colors.grey}` : 'none'};
`;

export const InputRadio = styled.input`
  display: none;
`;
