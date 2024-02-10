import { ButtonStyled, TextStyled } from './Button.styled';

export const Button = ({
  title,
  content,
  Icon,
  handleClick,
  disabled,
  active,
  w,
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
  active?: boolean;
  w?: number;
}) => (
  <ButtonStyled
    type="button"
    onClick={handleClick}
    disabled={disabled}
    title={title}
    className={`${active && 'active'}`}
    data-width={w}
  >
    {content && <TextStyled>{content}</TextStyled>}
    {Icon && <Icon />}
  </ButtonStyled>
);
