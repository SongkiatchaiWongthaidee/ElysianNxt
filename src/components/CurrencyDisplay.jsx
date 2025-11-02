// CurrencyDisplay.jsx — Warm Woodsy Theme
import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Coins } from "lucide-react";

const floatSlow = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-6px) scale(1.02); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.05); }
`;

const Container = styled.div`
  position: relative;
  margin-left: auto;
  text-align: right;
  background: linear-gradient(145deg, #fef9c3, #fcd34d, #eab308);
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(107, 83, 34, 0.5);
  padding: 16px 24px;
  border: 3px solid #78350f;
  animation: ${floatSlow} 7s ease-in-out infinite;
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 28px;
  font-weight: 900;
  color: #422006;
  text-shadow: 0 3px 6px rgba(255, 255, 255, 0.4);
  letter-spacing: 1px;
`;

const CoinIcon = styled(Coins)`
  width: 32px;
  height: 32px;
  color: #92400e;
  animation: ${pulse} 2.5s ease-in-out infinite;
`;

const Passive = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  color: #4d7c0f;
  margin-top: 8px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 9999px;
  padding: 4px 12px;
  font-weight: 600;
  border: 2px solid rgba(107, 83, 34, 0.3);
`;

const CurrencyDisplay = ({
  currency = 0,
  passiveIncome = 0,
  tickRate = 2000,
}) => {
  return (
    <Container>
      <Amount>
        <CoinIcon />
        <span>{currency.toFixed(0)}</span>
      </Amount>
      {passiveIncome > 0 && (
        <Passive>
          <span>
            +{passiveIncome} every {(tickRate / 1000).toFixed(1)}s
          </span>
        </Passive>
      )}
    </Container>
  );
};

export default CurrencyDisplay;