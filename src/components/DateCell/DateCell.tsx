import {
  Wrapper,
  Title,
  DayStyled,
  DateBox,
  Tasks,
  TaskContainer,
  LabelsContainer,
  ButtonContainer,
  LabelColor,
  LabelText,
  TaskTitle,
  TaskContent,
  IconNewTaskStyled,
  Button,
  IconEditTaskStyled,
  IconDeleteTaskStyled,
  TitleContainer,
  Holidays,
  HolidayTitle,
} from 'components/DateCell/DateCell.styled';
import { nanoid } from 'nanoid';
import { Holiday, Task } from 'types';
import { getCurrentDate } from 'utils';

export const DateCell = ({
  day,
  tasks,
  onTaskUpdate,
  savedWeekOrMonth,
  weekOrMonthType,
  holidays,
}: {
  day: string;
  tasks: Task[];
  onTaskUpdate: Function;
  savedWeekOrMonth: string;
  weekOrMonthType: string;
  holidays: Holiday[];
}): JSX.Element => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, task: Task) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(task));
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');

    if (data) {
      const draggedTask = JSON.parse(data);
      let updatedTasks = [...tasks];
      const draggedIndex = tasks.findIndex((task) => task.id === draggedTask.id);

      if (day === draggedTask.date.split('.')[2]) {
        const dropTaskElement = e.target as HTMLElement;
        const dropTaskOrder = Number(dropTaskElement.dataset.set);

        if (dropTaskOrder || dropTaskOrder === 0) {
          updatedTasks = updatedTasks.map((task) => {
            if (task.id === draggedTask.id) {
              return { ...task, order: dropTaskOrder };
            } else if (draggedTask.order > dropTaskOrder && task.order >= dropTaskOrder) {
              return { ...task, order: task.order + 1 };
            } else if (draggedTask.order < dropTaskOrder && task.order <= dropTaskOrder) {
              return { ...task, order: task.order - 1 };
            }

            return task;
          });
        }
      } else {
        updatedTasks.splice(draggedIndex, 1);

        draggedTask.date = getCurrentDate(
          Number(savedWeekOrMonth.split(' ')[1]),
          Number(savedWeekOrMonth.split(' ')[0]),
          day,
          weekOrMonthType
        );

        draggedTask.order = tasks.length;

        updatedTasks.push(draggedTask);
      }

      onTaskUpdate(updatedTasks);
    }
  };

  return (
    <Wrapper onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <DateBox>
        <DayStyled>{day}</DayStyled>
        {tasks && tasks.length > 0 && <Title>{`${tasks.length} cards`}</Title>}
        <Button type="button" onClick={() => console.log('add new')} title="Add the new Task">
          <IconNewTaskStyled />
        </Button>
      </DateBox>
      {holidays && holidays.length > 0 && (
        <Holidays>
          {holidays.map((holiday) => (
            <HolidayTitle key={nanoid()}>{holiday.name}</HolidayTitle>
          ))}
        </Holidays>
      )}
      <Tasks>
        {tasks
          .sort((a, b) => a.order - b.order)
          .map((task) => (
            <TaskContainer
              key={nanoid()}
              draggable
              onDragStart={(e) => handleDragStart(e, task)}
              data-set={task.order}
            >
              {task.label && task.label?.length > 0 && (
                <LabelsContainer data-set={task.order}>
                  {task.label
                    .sort((a, b) => a.order - b.order)
                    .map((item) => (
                      <LabelColor key={nanoid()} data-color={item.color} data-set={task.order}>
                        <LabelText data-set={task.order}>{item.text}</LabelText>
                      </LabelColor>
                    ))}
                </LabelsContainer>
              )}
              {task.title && (
                <TitleContainer data-set={task.order}>
                  <ButtonContainer className="buttons-container" data-set={task.order}>
                    <Button type="button" onClick={() => console.log('edit')} title="Edit the Task">
                      <IconEditTaskStyled />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => console.log('delete')}
                      title="Delete the Task"
                    >
                      <IconDeleteTaskStyled />
                    </Button>
                  </ButtonContainer>
                  <TaskTitle data-set={task.order}>{task.title}</TaskTitle>
                </TitleContainer>
              )}
              {task.content && <TaskContent data-set={task.order}>{task.content}</TaskContent>}
            </TaskContainer>
          ))}
      </Tasks>
    </Wrapper>
  );
};
