import { ReactNode } from 'react';
import { ButtonStyled, TextStyled } from './Button.styled';

export const Button = ({
  title,
  children,
  handleClick,
}: {
  title?: string;
  children?: ReactNode;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <ButtonStyled type="button" onClick={handleClick}>
      {title && <TextStyled>{title}</TextStyled>}
      {children}
    </ButtonStyled>
  );
};
