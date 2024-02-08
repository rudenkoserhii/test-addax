import { Wrapper, Img } from './Home.styled';
import logo from 'assets/images/logo.png';

export default function Home() {
  return (
    <Wrapper>
      <Img src={logo} />
    </Wrapper>
  );
}
