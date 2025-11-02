// Tree.jsx
import { useState } from 'react';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

const shake = keyframes`
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-12px) rotate(-5deg); }
  50% { transform: translateX(12px) rotate(5deg); }
  75% { transform: translateX(-6px) rotate(-2deg); }
`;

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const Container = styled.div`
  cursor: pointer;
  user-select: none;
  transition: transform 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.05);
    cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><text y="24" font-size="24">🪓</text></svg>') 16 16, pointer;
  }

  ${props => props.isShaking && css`
    animation: ${shake} 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  `}
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(190, 242, 100, 0.3), transparent 70%);
  filter: blur(60px);
  border-radius: 50%;
  transform: scale(1.4);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
`;

const Emoji = styled.div`
  font-size: 200px;
  filter: drop-shadow(0 25px 40px rgba(0, 0, 0, 0.45));
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;

  ${Container}:hover & {
    filter: drop-shadow(0 0 40px rgba(190, 242, 100, 0.8));
  }
`;

const ClickIndicator = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  font-size: 52px;
  pointer-events: none;
  animation: ${pulse} 1.2s ease-in-out infinite;
  ${Container}:hover & {
    opacity: 0.8;
  }
`;

const HealthContainer = styled.div`
  position: absolute;
  bottom: -64px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
`;

const HealthBar = styled.div`
  background: linear-gradient(to right, #78350f, #451a03);
  border-radius: 9999px;
  height: 28px;
  overflow: hidden;
  border: 3px solid #fef3c7;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
`;

const HealthFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s ease;
  background: ${props => {
    if (props.percentage <= 30)
      return 'linear-gradient(to right, #ef4444, #b91c1c)';
    if (props.percentage <= 60)
      return 'linear-gradient(to right, #facc15, #d97706)';
    return 'linear-gradient(to right, #a3e635, #65a30d)';
  }};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const HealthShine = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: ${shimmer} 2s infinite linear;
`;

const HealthText = styled.div`
  text-align: center;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 900;
  color: #422006;
  background: linear-gradient(to right, #fef9c3, #fde68a);
  border-radius: 9999px;
  border: 2px solid rgba(120, 85, 40, 0.4);
  padding: 4px 16px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
`;

const HealthCurrent = styled.span`
  color: ${props => {
    if (props.percentage <= 30) return '#dc2626';
    if (props.percentage <= 60) return '#b45309';
    return '#3f6212';
  }};
`;

const HealthMax = styled.span`
  color: #78350f;
`;

const Tree = ({ health, maxHealth, onCut, isShaking }) => {
  const [isShakingInternal, setIsShakingInternal] = useState(false);
  const healthPercentage = (health / maxHealth) * 100;

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      // Trigger shake animation
      setIsShakingInternal(true);
      setTimeout(() => setIsShakingInternal(false), 450); // Match animation duration
      
      onCut(); // Call the parent callback
    }
  };

  return (
    <Container onMouseDown={handleMouseDown} isShaking={isShakingInternal || isShaking}>
      <Glow />
      <Emoji>🌳</Emoji>
      <ClickIndicator>🪓</ClickIndicator>

      <HealthContainer>
        <HealthBar>
          <HealthFill percentage={healthPercentage}>
            <HealthShine />
          </HealthFill>
        </HealthBar>
        <HealthText>
          <HealthCurrent percentage={healthPercentage}>
            {health.toFixed(0)}
          </HealthCurrent>
          <HealthMax> / {maxHealth}</HealthMax>
        </HealthText>
      </HealthContainer>
    </Container>
  );
};

export default Tree;