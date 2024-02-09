import { HeaderStyled } from 'components/AppBar/AppBar.styled';
import { AuthNav } from 'components/AuthNav/AuthNav';
import { Logo } from 'components/Logo/Logo';
import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { useAuth } from 'hooks';

export const AppBar = () => {
  const { isLoggedIn } = useAuth();

  return (
    <HeaderStyled>
      <Logo />
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </HeaderStyled>
  );
};
