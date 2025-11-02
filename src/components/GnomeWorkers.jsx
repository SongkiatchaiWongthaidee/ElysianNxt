// GnomeWorkers.jsx – Warm Woodsy Theme
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); }
`;

const pulseGlow = keyframes`
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.1); }
`;

const GnomeContainer = styled.div`
  position: absolute;
  user-select: none;
  bottom: 50px;
  display: flex;
  gap: 27px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Gnome = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 46px;
  animation: ${float} 2.8s ease-in-out infinite;
  animation-delay: ${(props) => props.index * 0.2}s;
  filter: drop-shadow(0 6px 6px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s;
  cursor: default;

  &:hover {
    transform: scale(1.1);
  }
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(190, 242, 100, 0.35), transparent 70%);
  filter: blur(35px);
  border-radius: 50%;
  animation: ${pulseGlow} 3s ease-in-out infinite;
  z-index: -1;
`;

const Label = styled.div`
  position: absolute;
  top: 60px;
  background: linear-gradient(to right, #fef3c7, #eab308);
  color: #422006;
  font-weight: 800;
  border-radius: 9px;
  padding: 4px 12px;
  font-size: 12px;
  border: 2px solid rgba(120, 85, 40, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease forwards;
`;

const PlusIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  color: #dbeafe;
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  border: 3px solid #60a5fa;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
  animation: ${float} 2.8s ease-in-out infinite;
  animation-delay: 1s;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-top: 25px; 
  padding: 7px;
`;

const GnomeWorkers = ({ count }) => {
  const maxDisplay = 4;
  const displayCount = Math.min(count, maxDisplay);
  const remaining = count - maxDisplay;
  const gnomes = Array.from({ length: displayCount });

  return (
    <GnomeContainer>
      {gnomes.map((_, i) => (
        <Gnome key={i} index={i}>
          <Glow />
          <span role="img" aria-label="gnome">
            🧙‍♂️
          </span>
          <Label>Worker</Label>
        </Gnome>
      ))}
      {remaining > 0 && (
        <PlusIndicator>+{remaining}</PlusIndicator>
      )}
    </GnomeContainer>
  );
};

export default GnomeWorkers;