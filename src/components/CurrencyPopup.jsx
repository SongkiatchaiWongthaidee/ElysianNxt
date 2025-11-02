// CurrencyPopup.jsx – Warm Woodsy Theme
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const floatUp = keyframes`
  0% { opacity: 1; transform: translateY(0) scale(1); }
  50% { transform: translateY(-40px) scale(1.1); }
  100% { opacity: 0; transform: translateY(-100px) scale(0.9); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const Popup = styled.div`
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  pointer-events: none;
  z-index: 40;
  animation: ${floatUp} 2.4s ease-out forwards;
`;

const Content = styled.div`
  font-weight: 900;
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.4));
  font-size: 32px;
  position: relative;
  ${props => props.isTreeBonus && 'transform: scale(1.3);'}
`;

const Glow = styled.div`
  position: absolute;
  inset: 0;
  filter: blur(20px);
  opacity: 0.4;
  transform: scale(1.3);
  background: ${(props) => {
    switch (props.type) {
      case "click":
        return "radial-gradient(circle, #eab308, #78350f)";
      case "passive":
        return "radial-gradient(circle, #65a30d, #3f6212)";
      case "coin":
        return "radial-gradient(circle, #fcd34d, #92400e)";
      case "tree":
        return "radial-gradient(circle, #84cc16, #4d7c0f)";
      default:
        return "radial-gradient(circle, #fef3c7, #a16207)";
    }
  }};
`;

const Text = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 9999px;
  padding: 6px 16px;
  border: 2px solid rgba(120, 85, 40, 0.5);
  color: ${(props) => {
    switch (props.type) {
      case "click":
        return "#78350f";
      case "passive":
        return "#365314";
      case "coin":
        return "#92400e";
      case "tree":
        return "#14532d";
      default:
        return "#422006";
    }
  }};
  font-weight: 900;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
`;

const Amount = styled.span`
  font-size: 32px;
`;

const CoinEmoji = styled.span`
  font-size: 26px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 800;
  color: #fefce8;
  margin-top: 8px;
  background: linear-gradient(to right, #4d7c0f, #15803d);
  padding: 4px 16px;
  border-radius: 9999px;
  border: 2px solid #a3e635;
  animation: ${pulse} 1.2s ease-in-out infinite;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

const CoinLabel = styled.div`
  font-size: 14px;
  color: #78350f;
  margin-top: 4px;
  font-weight: bold;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 9999px;
  padding: 2px 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const CurrencyPopup = ({ popup }) => {
  const isTreeBonus = popup.type === "tree";
  const isCoin = popup.type === "coin";

  return (
    <Popup x={popup.x} y={popup.y}>
      <Content isTreeBonus={isTreeBonus}>
        <Glow type={popup.type} />
        <Text type={popup.type}>
          <Amount>+{popup.amount}</Amount>
          <CoinEmoji>💰</CoinEmoji>
        </Text>
        {isTreeBonus && <Label>🌳 Tree Bonus! 🪓</Label>}
        {isCoin && <CoinLabel>✨ Coin Found! ✨</CoinLabel>}
      </Content>
    </Popup>
  );
};

const CurrencyPopupContainer = ({ popups }) => {
  return (
    <>
      {popups.map((popup) => (
        <CurrencyPopup key={popup.id} popup={popup} />
      ))}
    </>
  );
};

export default CurrencyPopupContainer;
