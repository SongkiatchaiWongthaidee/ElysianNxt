// Instructions.jsx
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
  margin-top: 64px;
  background: linear-gradient(to right, rgba(109, 40, 217, 0.9), rgba(37, 99, 235, 0.9), rgba(67, 56, 202, 0.9));
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  max-width: 768px;
  border: 4px solid rgba(255, 255, 255, 0.3);
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  color: white;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 24px;
  backdrop-filter: blur(10px);
`;

const Icon = styled.div`
  font-size: 36px;
  animation: ${bounce} 1s ease-in-out infinite;
`;

const Text = styled.div`
  text-align: left;
`;

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 12px;
  opacity: 0.9;
  margin: 0;
`;

const Key = styled.kbd`
  padding: 8px 16px;
  background: white;
  color: #1f2937;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  border: 2px solid #d1d5db;
`;

const Tips = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  font-size: 14px;
`;

const Tip = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TipIcon = styled.span`
  font-size: 20px;
`;

const TipText = styled.span`
  font-weight: 600;
`;

const Highlight = styled.span`
  color: #fcd34d;
`;

const Instructions = () => {
  return (
    <Container>
      <Main>
        <Box>
          <Icon>🖱️</Icon>
          <Text>
            <Title>Click the Tree</Title>
            <Subtitle>Earn coins instantly!</Subtitle>
          </Text>
        </Box>
      </Main>
      
      <Tips>
        <Tip>
          <TipIcon>$</TipIcon>
          <TipText>Grab falling coins!</TipText>
        </Tip>
        <Tip>
          <TipIcon>🌳</TipIcon>
          <TipText>
            Cut trees for <Highlight>5x bonus!</Highlight>
          </TipText>
        </Tip>
      </Tips>
    </Container>
  );
};

export default Instructions;