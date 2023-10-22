import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #f4978e;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: ${spin} 1.5s linear infinite;
`;

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  width: 100vw;
  justify-content: center;
align-items: center;
`;

export const LoadingSpinner = () => {
    return (
        <Container>
            <Spinner />
        </Container>
    )
}

export default LoadingSpinner;
