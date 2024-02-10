import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { AppBar } from 'components/AppBar/AppBar';
import { Wrapper } from 'components/LayOut/LayOut.styled';

export const LayOut = (): JSX.Element => (
  <Wrapper id="screenshot">
    <AppBar />
    <Suspense fallback={null}>
      <Outlet />
    </Suspense>
  </Wrapper>
);
