import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: calc(100vh - ${p => p.theme.space[6]}px);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Img = styled.img`
`;
