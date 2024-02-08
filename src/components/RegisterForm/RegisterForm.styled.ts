import styled from 'styled-components';

export const LabelStyled = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: ${p => p.theme.space[4]}px;
`;

export const ButtonStyled = styled.button`
    width: ${p => p.theme.space[8]}px;


    border: none;
    font: inherit;
    cursor: pointer;
    outline: none;
    margin-left: auto;
    border-radius: ${p => p.theme.radii.normal};
    padding: ${p => p.theme.space[3]}px ${p => p.theme.space[4]}px;
    background-color: ${p => p.theme.colors.lightblue};
    color: ${p => p.theme.colors.white};

    &:hover,
    &:focus {
    background-color: ${p => p.theme.colors.blue};
    }

    &:active {
    ${p => p.theme.shadows.second};
    }
`;

export const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${p => p.theme.space[2]}px;
    margin-bottom: ${p => p.theme.space[4]}px;
`;

export const InputStyled = styled.input`
    flex-grow: 1;
    padding: ${p => p.theme.space[3]}px;
    border: ${p => p.theme.borders.dark};
    border-radius: ${p => p.theme.radii.normal};
    font: inherit;
    line-height: ${p => p.theme.lineHeights.body};
    letter-spacing: 0.01em;
    resize: none;
`;
