import axios from 'axios';
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
import { monthNames } from 'enums';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { deleteTask, editTask, getTasks } from 'store/tasks/operations';
import { selectLoading } from 'store/tasks/selectors';
import { Holiday, Task } from 'types';
import { getCurrentDate } from 'utils';

export const DateCell = ({
  day,
  month,
  currentMonth,
  tasks,
  onTaskUpdate,
  savedWeekOrMonth,
  weekOrMonthType,
  holidays,
}: {
  day: string;
  month: string;
  currentMonth: string;
  tasks: Task[];
  onTaskUpdate: (value: Task[]) => void;
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

      axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

      try {
        updatedTasks.forEach(async (updatedTask) => {
          const response = await dispatch(editTask(updatedTask));

          if (response.meta.requestStatus === 'rejected') {
            Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

            return;
          }
        });
      } catch (error) {
        Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
      }
    }
  };

  const handleNewOrEditTask = (): void => toggleModal();

  const handleDelete = (name: string, taskId: string) => {
    Notiflix.Confirm.init({
      titleColor: 'blue',
      okButtonBackground: 'blue',
    });

    Notiflix.Notify.init({
      success: {
        background: 'blue',
      },
    });

    Notiflix.Confirm.show(
      'Accept Deleting',
      'Do you want to delete the Task?',
      'Yes',
      'No',
      async () => {
        try {
          axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

          const response = await dispatch(deleteTask(taskId));

          if (response.meta.requestStatus === 'rejected') {
            Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

            return;
          }

          Notiflix.Notify.success(`Task '${name}' was deleted!`);
          const responseWithTasks = await dispatch(getTasks());

          if (responseWithTasks.meta.requestStatus === 'rejected') {
            Notiflix.Notify.failure(`Something went wrong - ${response.payload}!`);

            return;
          }
        } catch (error) {
          Notiflix.Notify.failure(`Something went wrong - ${error.message}`);
        }
      }
    );
  };

  const checkTaskOfCurrentMonth =
    tasks &&
    tasks.length > 0 &&
    monthNames[Number(tasks[0]?.date?.split('.')[1]) - 1].slice(0, 3) === month;

  const checkHolidayOfCurrentMonth =
    holidays &&
    holidays.length > 0 &&
    monthNames[Number(holidays[0]?.date?.split('-')[1]) - 1].slice(0, 3) === month;

  const isLastOrFirstDayOfMonth = () => {
    const year = Number(savedWeekOrMonth.split(' ')[1]);
    const neededMonth = monthNames.findIndex(
      (monthName) => monthName.slice(0, 3).toLowerCase() === month.toLowerCase()
    );

    if (day === '1') {
      return true;
    }

    return new Date(year, neededMonth + 1, 0).getDate() === Number(day);
  };

  return (
    <Wrapper
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      data-pointer-events={month === currentMonth}
    >
      <DateBox>
        {isLastOrFirstDayOfMonth() && <DayStyled>{month}</DayStyled>}
        <DayStyled>{day}</DayStyled>
        {tasks && tasks.length > 0 && checkTaskOfCurrentMonth && (
          <Title>{`${tasks.length} cards`}</Title>
        )}
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
      {holidays && holidays.length > 0 && checkHolidayOfCurrentMonth && (
        <Holidays>
          {holidays.map((holiday) => (
            <HolidayTitle key={nanoid()}>{holiday.name}</HolidayTitle>
          ))}
        </Holidays>
      )}
      <Tasks>
        {checkTaskOfCurrentMonth &&
          tasks &&
          tasks.length > 0 &&
          (() => {
            const sortedTasks = [...tasks].sort((a, b) => b.order - a.order);

            return sortedTasks.map((task) => (
              <TaskContainer
                key={nanoid()}
                draggable
                onDragStart={(e) => handleDragStart(e, task)}
                data-set={task.order}
              >
                {task.labels && task.labels?.length > 0 && (
                  <LabelsContainer data-set={task.order}>
                    {task.labels &&
                      task.labels.length > 0 &&
                      (() => {
                        const sortedLabels = [...task.labels].sort((a, b) => b.order - a.order);

                        return sortedLabels.map((item) => (
                          <LabelColor
                            key={nanoid()}
                            data-color={item.color}
                            data-set={task.order}
                            title={item.text}
                          />
                        ));
                      })()}
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
            ));
          })()}
      </Tasks>
      <Loading isVisible={isLoading} />
      {showModal && (
        <ModalTask
          onClose={toggleModal}
          taskToEdit={taskToEdit || undefined}
          nextOrder={tasks ? tasks.length : 0}
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
