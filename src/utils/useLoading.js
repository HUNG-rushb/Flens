import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
0%, 100% {
    transform: scale(1);
  }
`;

const dot1Animation = keyframes`
0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
`;
const dot2Animation = keyframes`
0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
`;
const dot3Animation = keyframes`
0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.25);
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(
    0,
    0,
    0,
    0.6
  );
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Content = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const Dots = styled.div`
  display: flex;
  align-items: center;
`;

const Dot = styled.div`
  width: 20px;
  height: 20px;
  background: #f08080;
  border-radius: 50%;
  margin: 0 5px;
  animation: ${loadingAnimation} 1s infinite;
  animation-timing-function: ease-in-out;

  &:nth-child(1) {
    animation-name: ${dot1Animation};
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-name: ${dot2Animation};
    animation-delay: 0.5s;
    transform: scale(1.25);
  }

  &:nth-child(3) {
    animation-name: ${dot3Animation};
    animation-delay: 1s;
    transform: scale(1.4);
  }
`;

const GloabalLoading = ({ loading }) => {
  return loading ? (
    <Overlay>
      <Content>
        <Dots>
          <Dot></Dot>
          <Dot></Dot>
          <Dot></Dot>
        </Dots>
      </Content>
    </Overlay>
  ) : null;
};

export default GloabalLoading;
