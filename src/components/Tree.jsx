import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const shake = keyframes`
  0%, 100% { transform: translateX(0) rotate(0deg); }
  25% { transform: translateX(-15px) rotate(-8deg); }
  50% { transform: translateX(15px) rotate(8deg); }
  75% { transform: translateX(-10px) rotate(-4deg); }
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
    transform: scale(1.1);
  }

  &:hover .tree-glow {
    opacity: 1;
  }

  &:hover .tree-emoji {
    filter: drop-shadow(0 0 30px rgba(34, 197, 94, 0.7));
  }

  &:hover .tree-click-indicator {
    opacity: 1;
    animation: ${pulse} 1s ease-in-out infinite;
  }

  ${props => props.isShaking && `
    animation: ${shake} 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97);
  `}
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(74, 222, 128, 0.3);
  filter: blur(60px);
  border-radius: 50%;
  transform: scale(1.5);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
`;

const Emoji = styled.div`
  font-size: 200px;
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
  transition: all 0.3s;
  position: relative;
  z-index: 10;
`;

const ClickIndicator = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  font-size: 60px;
`;

const HealthContainer = styled.div`
  position: absolute;
  bottom: -64px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
`;

const HealthBar = styled.div`
  position: relative;
  background: linear-gradient(to right, #1f2937, #374151, #1f2937);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  height: 32px;
  overflow: hidden;
  border: 4px solid white;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
`;

const HealthFill = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  transition: width 0.3s, background 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: relative;
  background: ${props => {
    if (props.percentage <= 30) return 'linear-gradient(to right, #ef4444, #dc2626, #b91c1c)';
    if (props.percentage <= 60) return 'linear-gradient(to right, #facc15, #f97316, #ea580c)';
    return 'linear-gradient(to right, #4ade80, #22c55e, #10b981)';
  }};
`;

const HealthShine = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: ${shimmer} 2s infinite;
`;

const HealthText = styled.div`
  text-align: center;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 900;
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8));
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-radius: 9999px;
  padding: 4px 16px;
`;

const HealthCurrent = styled.span`
  color: ${props => {
    if (props.percentage <= 30) return '#fca5a5';
    if (props.percentage <= 60) return '#fcd34d';
    return '#86efac';
  }};
`;

const HealthMax = styled.span`
  color: #d1d5db;
`;

const Tree = ({ health, maxHealth, onCut, isShaking }) => {
  const healthPercentage = (health / maxHealth) * 100;

  // Only trigger cut on left mouse button
  const handleMouseDown = (e) => {
    if (e.button === 0) {
      onCut();
    }
  };

  return (
    <Container onMouseDown={handleMouseDown} isShaking={isShaking}>
      <Glow className="tree-glow" />
      <div>
        <Emoji className="tree-emoji">🌳</Emoji>
        <ClickIndicator className="tree-click-indicator">👆</ClickIndicator>

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
      </div>
    </Container>
  );
};

export default Tree;
