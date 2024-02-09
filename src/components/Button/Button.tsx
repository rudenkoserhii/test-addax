import { ReactNode } from 'react';
import { ButtonStyled, TextStyled } from './Button.styled';

export const Button = ({
  title,
  content,
  Icon,
  handleClick,
  disabled,
}: {
  title?: string;
  content?: string;
  Icon?: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
}) => (
  <ButtonStyled type="button" onClick={handleClick} disabled={disabled} title={title}>
    {content && <TextStyled>{content}</TextStyled>}
    {Icon && <Icon />}
  </ButtonStyled>
);
