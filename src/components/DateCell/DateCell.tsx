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
import { Loading } from 'components/Loading/Loading';
import { ModalTask } from 'components/ModalTask/ModalTask';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { deleteTask } from 'store/tasks/operations';
import { selectLoading } from 'store/tasks/selectors';
import { Holiday, Task } from 'types';
import { getCurrentDate } from 'utils';

export const DateCell = ({
  day,
  tasks,
  onTaskUpdate,
  onTaskDelete,
  savedWeekOrMonth,
  weekOrMonthType,
  holidays,
}: {
  day: string;
  tasks: Task[];
  onTaskUpdate: (value: Task[]) => void;
  onTaskDelete: (taskId: string) => void;
  savedWeekOrMonth: string;
  weekOrMonthType: string;
  holidays: Holiday[];
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>();

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const toggleModal = (): void => {
    setShowModal(!showModal);
  };

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

  const handleNewOrEditTask = (): void => toggleModal();

  const handleDelete = (name: string, taskId: string) => {
    Notiflix.Confirm.show(
      'Accept Deleting',
      'Do you want to delete the Task?',
      'Yes',
      'No',
      async () => {
        try {
          await dispatch(deleteTask(taskId));
          Notiflix.Notify.success(`Task '${name}' was deleted!`);
          onTaskDelete(taskId);
        } catch (error) {
          Notiflix.Notify.failure(error.message);
        }
      }
    );
  };

  return (
    <Wrapper onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <DateBox>
        <DayStyled>{day}</DayStyled>
        {tasks && tasks.length > 0 && <Title>{`${tasks.length} cards`}</Title>}
        <Button
          className="buttons"
          type="button"
          onClick={() => {
            setTaskToEdit(null);
            handleNewOrEditTask();
          }}
          title="Add the new Task"
        >
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
                        {item && item.text !== '' && (
                          <LabelText data-set={task.order}>{item.text}</LabelText>
                        )}
                      </LabelColor>
                    ))}
                </LabelsContainer>
              )}
              {task.title && (
                <TitleContainer data-set={task.order}>
                  <ButtonContainer className="buttons-container" data-set={task.order}>
                    <Button
                      type="button"
                      onClick={() => {
                        setTaskToEdit(task);
                        handleNewOrEditTask();
                      }}
                      title="Edit the Task"
                    >
                      <IconEditTaskStyled />
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        if (task && task.id) handleDelete(task.title, task.id);
                      }}
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
      <Loading isVisible={isLoading} />
      {showModal && (
        <ModalTask
          onClose={toggleModal}
          taskToEdit={taskToEdit || undefined}
          onTaskUpdate={onTaskUpdate}
          currentDate={getCurrentDate(
            Number(savedWeekOrMonth.split(' ')[1]),
            Number(savedWeekOrMonth.split(' ')[0]),
            day,
            weekOrMonthType
          )}
        />
      )}
    </Wrapper>
  );
};
