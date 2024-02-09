import {
  WrapperLink,
  LogoStyled,
  TextBox,
  TextTitle,
  TextSlogan,
} from 'components/Logo/Logo.styled';

export const Logo = () => (
  <WrapperLink to="/" title="Go to Home page">
    <LogoStyled />
    <TextBox>
      <TextTitle>CalenDate</TextTitle>
      <TextSlogan>Plan Your Date with CalenDate</TextSlogan>
    </TextBox>
  </WrapperLink>
);
