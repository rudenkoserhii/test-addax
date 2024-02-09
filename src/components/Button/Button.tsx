import { ReactNode } from 'react';
import { ButtonStyled, TextStyled } from './Button.styled';

export const Button = ({
  title,
  content,
  children,
  handleClick,
  disabled,
}: {
  title?: string;
  content?: string;
  children?: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}) => {
  return (
    <ButtonStyled type="button" onClick={handleClick} disabled={disabled} title={title}>
      {content && <TextStyled>{content}</TextStyled>}
      {children}
    </ButtonStyled>
  );
};
