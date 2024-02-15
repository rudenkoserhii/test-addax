import styled from 'styled-components';
import { ReactComponent as TaskNewIcon } from 'assets/icons/calendar-new.svg';
import { ReactComponent as TaskEditIcon } from 'assets/icons/calendar-edit.svg';
import { ReactComponent as TaskDeleteIcon } from 'assets/icons/calendar-remove.svg';

export const IconNewTaskStyled = styled(TaskNewIcon)`
  height: ${(p) => p.theme.space[4]}px;
  width: auto;
`;

export const IconEditTaskStyled = styled(TaskEditIcon)`
  height: ${(p) => p.theme.space[4]}px;
  width: auto;
`;

export const IconDeleteTaskStyled = styled(TaskDeleteIcon)`
  height: ${(p) => p.theme.space[4]}px;
  width: auto;
`;

export const Button = styled.button`
  all: unset;
  appearance: none;
  cursor: pointer;
  transition: all 200ms ease-in;
  margin-left: auto;
  height: ${(p) => p.theme.space[4]}px;

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

  &.buttons {
    visibility: hidden;
  }
`;

export const Wrapper = styled.div<{ 'data-pointer-events': boolean }>`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: visible !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }

  &:hover > div > .buttons {
    visibility: visible;
  }

  pointer-events: ${(p) => (p['data-pointer-events'] ? 'auto' : 'none')};
`;
export const Title = styled.p`
  font-size: ${(p) => p.theme.fontSizes.s};
`;
export const DayStyled = styled.p`
  font-size: ${(p) => p.theme.fontSizes.m};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  margin-right: ${(p) => p.theme.space[3]}px;
`;
export const DateBox = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: ${(p) => p.theme.space[3]}px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Tasks = styled.div`
  max-width: 100%;
`;
export const TaskContainer = styled.div`
  max-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};

  background-color: ${(p) => p.theme.colors.lightgrey};

  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.space[2]}px;
  }
  &:hover .buttons-container {
    display: flex;
  }
`;
export const LabelsContainer = styled.div`
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: ${(p) => p.theme.space[2]}px;

  margin-bottom: ${(p) => p.theme.space[2]}px;
`;
export const ButtonContainer = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space[3]}px;

  border-radius: ${(p) => p.theme.radii.normal};
  background-color: ${(p) => p.theme.colors.lightgray};
  padding: ${(p) => p.theme.space[2]}px;

  position: absolute;
  top: -${(p) => p.theme.space[1]}px;
  right: 0;
  z-index: 11;
`;
export const LabelColor = styled.div<{ 'data-color': string | undefined }>`
  width: calc((100vw - 280px) / 35);
  height: ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};

  background-color: ${(props) => props['data-color']};

  position: relative;
`;

export const TaskTitle = styled.p`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes.s};

  margin-bottom: ${(p) => p.theme.space[2]}px;
`;
export const TaskContent = styled.p`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${(p) => p.theme.fontSizes.xs};
`;

export const HolidayTitle = styled.p`
  text-align: left;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes.s};
  color: ${(p) => p.theme.colors.red};

  &:not(:last-child) {
    margin-bottom: ${(p) => p.theme.space[2]}px;
  }
`;

export const Holidays = styled.div`
  text-align: left;
  padding: ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  margin-bottom: ${(p) => p.theme.space[2]}px;

  background-color: ${(p) => p.theme.colors.lightgrey};
`;
