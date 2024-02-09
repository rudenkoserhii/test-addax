import { Button } from 'components/Button/Button';
import { Wrapper } from 'components/Logo/Logo.styled';
import Logo as React.Component from 'assets/icons/logo.svg';

export const Logo = () => {

  return (
    <Wrapper>
      <Button handleClick={setPrevItem} title={`Previous ${weekOrMonth}`}>
        {arrowUp}
      </Button>
      <Button handleClick={setNextItem} title={`Next ${weekOrMonth}`}>
        {arrowDown}
      </Button>
    </Wrapper>
  );
};
