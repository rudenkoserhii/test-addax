import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.space[3]}px;
  padding: ${(p) => p.theme.space[2]}px;
`;

export const InputYear = styled.input`
  background-color: ${(p) => p.theme.colors.lightgray};
  height: ${(p) => p.theme.space[10]}px;
  width: ${(p) => p.theme.space[7]}px;
  padding: ${(p) => p.theme.space[0]}px;
  border: 0;
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  font-size: ${(p) => p.theme.fontSizes.ml};
  font-weight: ${(p) => p.theme.fontWeights.bold};

  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
  &:focus-visible {
    outline: 1px solid ${(p) => p.theme.colors.lightblue};
  }
`;

export const InputWeek = styled.input`
  background-color: ${(p) => p.theme.colors.lightgray};
  height: ${(p) => p.theme.space[10]}px;
  width: ${(p) => p.theme.space[11]}px;

  padding: ${(p) => p.theme.space[0]}px;
  border: 0;
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  font-size: ${(p) => p.theme.fontSizes.ml};
  font-weight: ${(p) => p.theme.fontWeights.bold};

  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
  &:focus-visible {
    outline: 1px solid ${(p) => p.theme.colors.lightblue};
  }
`;

export const Text = styled.p`
  width: fit-content;
  height: auto;
  padding: ${(p) => p.theme.space[0]}px;
  margin: ${(p) => p.theme.space[0]}px;
  position: absolute;
  top: 50%;
  left: ${(p) => p.theme.space[5]}px;
  transform: translateY(-50%);
  font-size: ${(p) => p.theme.fontSizes.ml};
  font-weight: ${(p) => p.theme.fontWeights.bold};

  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
`;

export const Select = styled.select`
  background-color: ${(p) => p.theme.colors.lightgray};
  height: ${(p) => p.theme.space[10]}px;
  width: ${(p) => p.theme.space[11]}px;

  padding: ${(p) => p.theme.space[0]}px;
  border: 0;
  border-radius: ${(p) => p.theme.radii.normal};
  font: inherit;
  font-size: ${(p) => p.theme.fontSizes.ml};
  font-weight: ${(p) => p.theme.fontWeights.bold};

  line-height: ${(p) => p.theme.lineHeights.body};
  letter-spacing: 0.01em;
  resize: none;
  &:focus-visible {
    outline: 1px solid ${(p) => p.theme.colors.lightblue};
  }
`;
