import {
  Wrapper,
  Title,
  DayStyled,
  DateBox,
  Tasks,
  TaskContainer,
  LabelsContainer,
  LabelContainer,
  LabelColor,
  LabelText,
  TaskTitle,
  TaskContent,
} from 'components/DateCell/DateCell.styled';
import { nanoid } from 'nanoid';
import { Task } from 'types';

export const DateCell = ({ day, tasks }: { day: string; tasks: Task[] }): JSX.Element => {
  console.log(tasks);

  return (
    <Wrapper>
      <DateBox>
        <DayStyled>{day}</DayStyled>
        {tasks && tasks.length > 0 && <Title>{`${tasks.length} cards`}</Title>}
      </DateBox>
      <Tasks>
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <TaskContainer key={nanoid()}>
              {task.label && task.label?.length > 0 && (
                <LabelsContainer>
                  {task.label
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <LabelContainer>
                        <LabelColor>{item.color}</LabelColor>
                        <LabelText>{item.text}</LabelText>
                      </LabelContainer>
                    ))}
                </LabelsContainer>
              )}
              {task.title && <TaskTitle>{task.title}</TaskTitle>}
              {task.content && <TaskContent>{task.content}</TaskContent>}
            </TaskContainer>
          ))}
      </Tasks>
    </Wrapper>
  );
};
