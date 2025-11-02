// Instructions.jsx – Warm Woodsy Theme
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  position: absolute;
  top: 5%;
  width: 200px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  color: #3f3f46;
  background: linear-gradient(160deg, #fefce8, #f5f3c8, #fde68a);
  border-radius: 20px;
  border: 2px solid rgba(120, 85, 40, 0.4);
  padding: 10px;
  box-shadow: 0 4px 12px rgba(107, 83, 34, 0.35);
  animation: ${fadeIn} 1s ease, ${float} 4s ease-in-out infinite;
  z-index: 12;
`;

const Emphasis = styled.span`
  color: #92400e;
  font-weight: 900;
`;

const Instructions = () => {
  return (
    <Container>
      <span>
        <Emphasis>🖱️ Left Click</Emphasis> to chop the tree
      </span>
    </Container>
  );
};

export default Instructions;
