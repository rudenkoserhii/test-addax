import styled from 'styled-components';

export const Wrapper = styled.div`
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1200;
`;

export const FormStyled = styled.form`
    display: flex;
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

export const ButtonStyled = styled.button`
    width: ${p => p.theme.space[7]}px;

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
