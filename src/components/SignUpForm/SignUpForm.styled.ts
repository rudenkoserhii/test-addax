import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;

  width: 100vw;
  height: calc(100vh - ${(p) => p.theme.space[13]}px);

  background-color: ${(p) => p.theme.colors.lightgray};
`;

export const LabelStyled = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: ${(p) => p.theme.space[4]}px;
`;

export const ButtonStyled = styled.button`
  width: ${(p) => p.theme.space[8]}px;

  border: none;
  font: inherit;
  cursor: pointer;
  outline: none;
  margin: 0 auto;
  border-radius: ${(p) => p.theme.radii.normal};
  padding: ${(p) => p.theme.space[3]}px ${(p) => p.theme.space[4]}px;
  background-color: ${(p) => p.theme.colors.lightblue};
  color: ${(p) => p.theme.colors.white};

  &:hover,
  &:focus {
    background-color: ${(p) => p.theme.colors.blue};
  }

  &:active {
    ${(p) => p.theme.shadows.second};
  }
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  border-radius: ${(p) => p.theme.radii.normal};

  background-color: ${(p) => p.theme.colors.white};
  gap: ${(p) => p.theme.space[2]}px;
  padding: ${(p) => p.theme.space[4]}px;
`;

export const InputStyled = styled.input`
  flex-grow: 1;
  padding: ${(p) => p.theme.space[3]}px;
  border: ${(p) => p.theme.borders.dark};
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
`;

export const Placeholder = styled.div`
  visibility: hidden;
  position: absolute;
  top: -${(p) => p.theme.space[14]}px;
  left: ${(p) => p.theme.space[3]}px;

  color: ${(p) => p.theme.colors.grey};
  margin: 0;
  padding: ${(p) => p.theme.space[0]}px ${(p) => p.theme.space[2]}px;
  border-radius: ${(p) => p.theme.radii.normal};
  background: linear-gradient(
    to bottom,
    transparent,
    transparent 50%,
    ${(p) => p.theme.colors.white} 50%,
    ${(p) => p.theme.colors.white}
  );
  background-size: 100% 100%;
`;

export const SelectStyled = styled.select`
  flex-grow: 1;
  padding: ${(p) => p.theme.space[3]}px;
  border: ${(p) => p.theme.borders.dark};
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
  &:required:invalid {
    color: gray;
  }
  & > option[value=''][disabled] {
    display: none;
  }
  & > option {
    color: black;
  }
`;
