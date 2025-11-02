// CoinDrop.jsx – Warm Woodsy Theme
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`;

const glowPulse = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.1); }
`;

const Drop = styled.div`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  z-index: 30;
  cursor: pointer;
  animation: ${bounce} 1.2s ease-in-out infinite;

  &:hover .coin-drop-coin {
    transform: scale(1.3) rotate(20deg);
  }
`;

const Content = styled.div`
  position: relative;
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  filter: blur(40px);
  background: radial-gradient(circle, rgba(231, 194, 125, 0.8), transparent 70%);
  animation: ${glowPulse} 2s ease-in-out infinite;
  opacity: 0.7;
`;

const Coin = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fcd34d, #b45309, #78350f);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #fef3c7;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
`;

const Emoji = styled.span`
  font-size: 26px;
  filter: drop-shadow(0 3px 4px rgba(0, 0, 0, 0.4));
`;

const Value = styled.div`
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 800;
  color: #3f3f46;
  background: linear-gradient(to right, #fef3c7, #fde68a);
  border: 2px solid #d97706;
  border-radius: 9999px;
  padding: 4px 20px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
`;

const CoinDrop = ({ coin, onCollect }) => {
  return (
    <Drop x={coin.x} y={coin.y} onClick={() => onCollect(coin)}>
      <Content>
        <Glow />
        <Coin className="coin-drop-coin">
          <Emoji>$</Emoji>
        </Coin>
        <Value>+{coin.value}$</Value>
      </Content>
    </Drop>
  );
};

const CoinDropContainer = ({ coins, onCollect }) => (
  <>
    {coins.map((coin) => (
      <CoinDrop key={coin.id} coin={coin} onCollect={onCollect} />
    ))}
  </>
);

export default CoinDropContainer;
