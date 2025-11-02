import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 80px;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1024px;
`;

const Worker = styled.div`
  position: relative;

  &:hover .gnome-emoji {
    transform: scale(1.25);
  }

  &:hover .gnome-glow {
    opacity: 1;
  }

  &:hover .gnome-badge {
    opacity: 1;
  }
`;

const Emoji = styled.div`
  font-size: 64px;
  filter: drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s;
  animation: ${bounce} 1.2s ease-in-out infinite;
  cursor: pointer;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(168, 85, 247, 0.3);
  filter: blur(20px);
  border-radius: 50%;
  transform: scale(1.5);
  opacity: 0;
  transition: opacity 0.3s;
`;

const Badge = styled.div`
  position: absolute;
  bottom: -24px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;
  background: #7c3aed;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 9999px;
  border: 2px solid #c4b5fd;
  white-space: nowrap;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const CountBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #7c3aed, #4f46e5);
  border-radius: 50%;
  border: 4px solid #c4b5fd;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const CountNumber = styled.div`
  font-size: 24px;
  font-weight: 900;
  color: white;
`;

const CountLabel = styled.div`
  font-size: 12px;
  color: #e9d5ff;
`;

const GnomeWorkers = ({ count }) => {
  return (
    <Container>
      {Array.from({ length: Math.min(count, 20) }).map((_, i) => (
        <Worker key={i}>
          <Emoji 
            className="gnome-emoji"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1.2s'
            }}
          >
            🧙
          </Emoji>
          <Glow className="gnome-glow" />
          <Badge className="gnome-badge">Worker #{i + 1}</Badge>
        </Worker>
      ))}
      
      {count > 20 && (
        <CountBadge>
          <div>
            <CountNumber>+{count - 20}</CountNumber>
            <CountLabel>more</CountLabel>
          </div>
        </CountBadge>
      )}
    </Container>
  );
};

export default GnomeWorkers;