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
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  z-index: 10;
`;

const Gnome = styled.div`
  position: relative;
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
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(to right, #fef3c7, #eab308);
  color: #422006;
  font-weight: 800;
  border-radius: 9999px;
  padding: 4px 12px;
  font-size: 14px;
  border: 2px solid rgba(120, 85, 40, 0.4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 1s ease forwards;
`;

const GnomeWorkers = ({ count }) => {
  const gnomes = Array.from({ length: count });

  return (
    <GnomeContainer>
      {gnomes.map((_, i) => (
        <Gnome key={i} index={i}>
          <Glow />
          <span role="img" aria-label="gnome">
            🧙‍♂️
          </span>
          <Label>Helper</Label>
        </Gnome>
      ))}
    </GnomeContainer>
  );
};

export default GnomeWorkers;
