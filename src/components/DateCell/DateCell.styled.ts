/* eslint-disable @typescript-eslint/no-explicit-any */
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
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

export const Tasks = styled.div``;
export const TaskContainer = styled.div`
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
  top: -${(p) => p.theme.space[2]}px;
  right: 0;
  z-index: 11;
`;
export const LabelColor = styled.div`
  cursor: pointer;

  width: calc((100vw - 270px) / 35);
  height: ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};

  background-color: ${(props: any) => props['data-color']};

  position: relative;
  &:hover > p {
    display: block;
  }
`;
export const LabelText = styled.p`
  display: none;
  font-size: ${(p) => p.theme.fontSizes.xs};
  white-space: nowrap;

  border-radius: ${(p) => p.theme.radii.normal};
  background-color: ${(p) => p.theme.colors.lightgray};
  opacity: 0.5;
  padding: ${(p) => p.theme.space[1]}px;

  position: absolute;
  bottom: ${(p) => p.theme.space[2]}px;
  left: 0;
  z-index: 10;
`;
export const TaskTitle = styled.p`
  text-align: left;
  font-weight: ${(p) => p.theme.fontWeights.bold};
  font-size: ${(p) => p.theme.fontSizes.s};

  margin-bottom: ${(p) => p.theme.space[2]}px;
`;
export const TaskContent = styled.p`
  font-size: ${(p) => p.theme.fontSizes.xs};
`;
