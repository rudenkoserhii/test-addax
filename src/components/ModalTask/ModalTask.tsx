import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, addTask } from 'store/tasks/operations';
import {
  Wrapper,
  Overlay,
  FormStyled,
  InputStyled,
  ButtonStyled,
  LabelStyled,
  Placeholder,
  ButtonColor,
  SelectStyled,
  InputRadio,
  Option,
  Button,
  IconNewTaskStyled,
  IconDeleteTaskStyled,
  Span,
} from './ModalTask.styled';
import { Task } from 'types';
import { AppDispatch } from 'store/store';
import { Loading } from 'components/Loading/Loading';
import { colors } from 'enums';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import { selectLoading } from 'store/tasks/selectors';
import axios from 'axios';

const modalRoot = document.querySelector('#modal-root');

type ModalProps = {
  taskToEdit: Task | undefined;
  onClose: () => void;
  onTaskUpdate: (value: Task[]) => void;
  currentDate: string;
};

export const ModalTask = ({ onClose, taskToEdit, onTaskUpdate, currentDate }: ModalProps) => {
  const [task, setTask] = useState<Task>(
    taskToEdit || {
      id: nanoid(),
      date: currentDate,
      title: '',
      order: 0,
    }
  );
  const [labels, setLabels] = useState<Task['label'] | []>(taskToEdit?.label || []);
  const INITIAL_LABEL = { id: nanoid(), color: 'empty', text: '', order: labels?.length || 0 };
  const [newLabel, setNewLabel] = useState<{
    id?: string | undefined;
    color?: string | undefined;
    text?: string | undefined;
    order: number;
  }>(INITIAL_LABEL);

  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    const form = event.currentTarget.parentElement as HTMLFormElement;

    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_HOST;

    if (taskToEdit) {
      dispatch(editTask({ ...task, label: labels }));
    } else {
      dispatch(addTask({ ...task, label: labels }));
    }
    onTaskUpdate([{ ...task, label: labels }]);
    form.reset();
    Notiflix.Notify.init({
      success: {
        background: 'blue',
      },
    });

    Notiflix.Notify.success(taskToEdit ? 'The Task was updated!' : 'The Task was created!');
    onClose();
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('keydown', onClickEscape);
    }

    return () => {
      window.removeEventListener('keydown', onClickEscape);
    };
  });

  const onClickEscape = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const onClickBackdrop = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const checkUpdating = (): boolean => {
    if (taskToEdit) {
      if (labels?.some(({ color }) => color === 'empty')) {
        return true;
      } else if (
        task?.title !== taskToEdit.title ||
        task.content !== taskToEdit.content ||
        labels?.length !== taskToEdit.label?.length ||
        labels?.some(
          (label1) =>
            !taskToEdit?.label?.some(
              (label2) =>
                label1.id === label2.id &&
                label1.color === label2.color &&
                label1.text === label2.text
            )
        ) ||
        taskToEdit?.label?.some(
          (label2) =>
            !labels?.some(
              (label1) =>
                label1.id === label2.id &&
                label1.color === label2.color &&
                label1.text === label2.text
            )
        )
      ) {
        return false;
      }

      return true;
    } else {
      if (task && task.title.length > 0) {
        return false;
      }

      return true;
    }
  };

  return (
    modalRoot &&
    createPortal(
      <Overlay onClick={onClickBackdrop}>
        <Wrapper>
          <FormStyled autoComplete="off">
            <LabelStyled
              data-index=""
              htmlFor="modalTitle"
              onFocus={(event) => {
                (event.target.previousSibling as HTMLDivElement).style.visibility = 'visible';
                event.target.removeAttribute('placeholder');
              }}
              onBlur={(event) => {
                (event.target.previousSibling as HTMLDivElement).style.visibility = 'hidden';
                event.target.setAttribute('placeholder', 'Type the task title');
              }}
            >
              <Placeholder>Type the task title</Placeholder>
              <InputStyled
                onChange={(event) => setTask({ ...task, title: event.target.value })}
                defaultValue={task?.title}
                type="text"
                name="modalTitle"
                placeholder="Type the task title"
                id="modalTitle"
                required
              />
            </LabelStyled>
            <LabelStyled
              data-index=""
              htmlFor="modalContent"
              onFocus={(event) => {
                (event.target.previousSibling as HTMLDivElement).style.visibility = 'visible';
                event.target.removeAttribute('placeholder');
              }}
              onBlur={(event) => {
                (event.target.previousSibling as HTMLDivElement).style.visibility = 'hidden';
                event.target.setAttribute('placeholder', 'Describe your Task here...');
              }}
            >
              <Placeholder>Describe your Task here...</Placeholder>
              <InputStyled
                onChange={(event) => setTask({ ...task, content: event.target.value })}
                defaultValue={task?.content}
                type="text"
                name="modalContent"
                as={'textarea'}
                placeholder="Describe your Task here..."
                id="modalContent"
              />
            </LabelStyled>

            {labels &&
              labels.length > 0 &&
              labels.map(({ id, color, text, order }, idx) => (
                <LabelStyled
                  key={id}
                  data-index={`${150 - idx}`}
                  htmlFor={`modal-edit-label-text-${id}`}
                >
                  <Placeholder>Change Label name</Placeholder>
                  <InputStyled
                    onFocus={(event) => {
                      if (event.target.id === `modal-edit-label-text-${id}`) {
                        const placeholder = event.target.previousSibling as HTMLDivElement;
                        const input = event.target;

                        placeholder.style.visibility = 'visible';
                        input.removeAttribute('placeholder');
                      }
                    }}
                    onBlur={(event) => {
                      if (event.target.id === `modal-edit-label-text-${id}`) {
                        const placeholder = event.target.previousSibling as HTMLDivElement;
                        const input = event.target;

                        placeholder.style.visibility = 'hidden';
                        input.setAttribute('placeholder', 'Change Label name');
                      }
                    }}
                    onChange={(event) => {
                      const newText = (event.target as HTMLInputElement).value;

                      setLabels(
                        labels.map((label) =>
                          label.id === id ? { ...label, text: newText } : label
                        )
                      );
                    }}
                    defaultValue={text}
                    className="label-edit"
                    type="text"
                    name={`modal-edit-label-text-${id}`}
                    placeholder="Change Label name"
                    id={`modal-edit-label-text-${id}`}
                  />
                  <ButtonColor type="button" data-color={color} title="Select label color">
                    <SelectStyled>
                      {colors.map(({ name, hexCode }, idx) => (
                        <Option
                          title={name.replace(name[0], name[0].toUpperCase())}
                          key={`${idx}+${idx}`}
                          data-color={hexCode}
                          data-checked={
                            colors.find((inColor) => inColor.name === name)?.hexCode === color
                          }
                          htmlFor={`modal-edit-${hexCode}-${id}`}
                          className={hexCode}
                        >
                          <InputRadio
                            onClick={(event) => {
                              const input = event.currentTarget as HTMLInputElement;

                              if (
                                colors.find(({ name }) => input.value === name)?.hexCode === color
                              ) {
                                setLabels(
                                  labels.map((label) =>
                                    label.id === id ? { ...label, color: 'empty' } : label
                                  )
                                );

                                input?.removeAttribute('checked');
                              } else {
                                setLabels(
                                  labels.map((label) =>
                                    label.id === id
                                      ? {
                                          ...label,
                                          color: colors.find(({ name }) => input.value === name)
                                            ?.hexCode,
                                        }
                                      : label
                                  )
                                );
                              }
                            }}
                            type="radio"
                            value={name}
                            id={`modal-edit-${hexCode}-${id}`}
                            name="modal-edit-color"
                            data-color={hexCode}
                            required
                          />
                        </Option>
                      ))}
                    </SelectStyled>
                    {color === 'empty' && (
                      <Span className="label-edit" style={{ visibility: 'visible' }}>
                        Color required!
                      </Span>
                    )}
                  </ButtonColor>
                  <Button
                    type="button"
                    title="Delete the Label"
                    onClick={() => {
                      if (labels) {
                        setLabels(
                          labels
                            .map((label) =>
                              label.order > order ? { ...label, order: order + 1 } : label
                            )
                            .filter((label) => label.id !== id)
                        );
                      }
                    }}
                  >
                    <IconDeleteTaskStyled />
                  </Button>
                </LabelStyled>
              ))}
            <LabelStyled
              data-index=""
              htmlFor="modal-new-label-text"
              onFocus={(event) => {
                if (event.target.id === `modal-new-label-text`) {
                  const placeholder = event.currentTarget.firstChild as HTMLDivElement;
                  const input = event.currentTarget.children[1] as HTMLInputElement;

                  placeholder.style.visibility = 'visible';
                  input.removeAttribute('placeholder');
                }
              }}
              onBlur={(event) => {
                if (event.target.id === `modal-new-label-text`) {
                  const placeholder = event.currentTarget.firstChild as HTMLDivElement;
                  const input = event.currentTarget.children[1] as HTMLInputElement;

                  placeholder.style.visibility = 'hidden';
                  input.setAttribute('placeholder', 'Type Label name');
                }
              }}
            >
              <Placeholder>Type Label name</Placeholder>
              <InputStyled
                defaultValue={newLabel.text}
                onChange={(event) =>
                  setNewLabel((prev) => ({
                    ...prev,
                    text: (event.target as HTMLInputElement).value,
                  }))
                }
                className="label"
                type="text"
                name="modal-new-label-text"
                placeholder="Type Label name"
                id="modal-new-label-text"
              />
              <ButtonColor type="button" data-color={newLabel.color} title="Select label color">
                <SelectStyled>
                  {colors.map(({ name, hexCode }) => (
                    <Option
                      title={name.replace(name[0], name[0].toUpperCase())}
                      key={nanoid()}
                      data-color={hexCode}
                      data-checked={hexCode === newLabel.color}
                      htmlFor={`modal-new-${hexCode}`}
                      className={hexCode}
                    >
                      <InputRadio
                        onChange={(event) => {
                          const input = event.currentTarget as HTMLInputElement;

                          if (
                            colors.find(({ name }) => input.value === name)?.hexCode ===
                            newLabel.color
                          ) {
                            setNewLabel({ ...newLabel, color: 'empty' });

                            input?.removeAttribute('checked');
                          } else {
                            setNewLabel({
                              ...newLabel,
                              color: colors.find(({ name }) => input.value === name)?.hexCode,
                            });
                          }
                        }}
                        required
                        type="radio"
                        value={name}
                        id={`modal-new-${hexCode}`}
                        name="modal-new-color"
                        data-color={hexCode}
                      />
                    </Option>
                  ))}
                </SelectStyled>
              </ButtonColor>
              <Button
                type="button"
                title="Add the new Label"
                onClick={(event) => {
                  if (labels && newLabel.color !== 'empty') {
                    setLabels([...labels, { ...newLabel, order: labels.length }]);
                    setNewLabel(INITIAL_LABEL);
                    (
                      event.currentTarget?.previousSibling?.previousSibling as HTMLInputElement
                    ).value = '';
                  }
                }}
                disabled={newLabel.color === 'empty' || !newLabel.color}
              >
                <IconNewTaskStyled />
                <Span>Color required!</Span>
              </Button>
            </LabelStyled>
            <ButtonStyled
              type="button"
              disabled={checkUpdating() ? true : false}
              onClick={handleSubmit}
            >
              {taskToEdit ? 'Update the Task' : 'Create the new Task'}
            </ButtonStyled>
            <Loading isVisible={isLoading} />
          </FormStyled>
        </Wrapper>
      </Overlay>,
      modalRoot
    )
  );
};
