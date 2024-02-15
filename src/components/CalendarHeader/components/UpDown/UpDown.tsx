import { Button } from 'components/Button/Button';
import { Wrapper, IconArrowUpStyled, IconArrowDownStyled } from './UpDown.styled';

export const UpDown = ({
  setPrevItem,
  setNextItem,
  weekOrMonth,
}: {
  setPrevItem: () => void;
  setNextItem: () => void;
  weekOrMonth: string;
}) => (
  <Wrapper>
    <Button
      handleClick={setPrevItem}
      title={`Previous ${weekOrMonth}`}
      Icon={IconArrowUpStyled}
      w={6}
    />
    <Button
      handleClick={setNextItem}
      title={`Next ${weekOrMonth}`}
      Icon={IconArrowDownStyled}
      w={6}
    />
  </Wrapper>
);
