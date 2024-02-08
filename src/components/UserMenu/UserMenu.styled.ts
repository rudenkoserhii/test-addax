import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    gap: ${p => p.theme.space[4]}px;
`;

export const Text = styled.p`
    font-weight: ${p => p.theme.fontWeights.bold};
`;

export const Span = styled.span`
    font-weight: ${p => p.theme.fontWeights.bold};
    font-size: ${p => p.theme.fontSizes.ml};

    color: ${p => p.theme.colors.lightblue};
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
