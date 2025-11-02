// UpgradePanel.jsx
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Sparkles } from 'lucide-react';
import { UPGRADE_CONFIG } from '../utils/constants';

const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const Panel = styled.div`
  position: relative;
  background: linear-gradient(135deg, rgba(120, 53, 15, 0.95), rgba(92, 64, 31, 0.95));
  backdrop-filter: blur(20px);
  border-radius: 14px;
  box-shadow: 
    0 20px 35px -12px rgba(0, 0, 0, 0.3),
    inset 4px 0 8px rgba(255, 237, 160, 0.2);
  padding: 18px;
  padding-left: 24px;
  width: 100%;
  max-height: 60vh;
  overflow-y: auto;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 6px solid #fbbf24;
  
  /* Decorative left border effect */
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 12px;
    background: linear-gradient(
      to right,
      rgba(251, 191, 36, 0.4),
      rgba(217, 119, 6, 0.3),
      transparent
    );
    border-radius: 14px 0 0 14px;
    pointer-events: none;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 4px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const TitleIcon = styled(Sparkles)`
  width: 22px;
  height: 22px;
  color: #facc15;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const Title = styled.h3`
  font-weight: 900;
  font-size: 18px;
  color: #fef9c3;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
  margin: 0;
`;

const Shine = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  transform: skewX(-12deg) translateX(-100%);
  transition: transform 0.7s ease-in;
`;

const Button = styled.button`
  width: 100%;
  color: white;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  transition: all 0.3s;
  border: none;
  background: ${props => {
    if (props.disabled) return 'linear-gradient(to right, #9ca3af, #6b7280)';
    switch(props.upgradeType) {
      case 'clickPower': return 'linear-gradient(to right, #84cc16, #65a30d)';
      case 'passiveIncome': return 'linear-gradient(to right, #22c55e, #15803d)';
      case 'tickSpeed': return 'linear-gradient(to right, #a3e635, #65a30d)';
      case 'gnomes': return 'linear-gradient(to right, #60a5fa, #3b82f6)';
      default: return 'linear-gradient(to right, #6ee7b7, #34d399)';
    }
  }};
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:not(:disabled):hover {
    transform: scale(1.03);
  }

  &:not(:disabled):hover ${Shine} {
    transform: skewX(-12deg) translateX(200%);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ButtonContent = styled.div`
  position: relative;
  z-index: 10;
`;

const ButtonTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
`;

const ButtonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ButtonIcon = styled.span`
  font-size: 20px;
`;

const ButtonText = styled.div`
  text-align: left;
`;

const ButtonName = styled.div`
  font-weight: bold;
  font-size: 13px;
`;

const ButtonLevel = styled.div`
  font-size: 10px;
  opacity: 0.9;
`;

const ButtonCost = styled.div`
  background: rgba(0, 0, 0, 0.25);
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 11px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ButtonStats = styled.div`
  font-size: 10px;
  opacity: 0.95;
  text-align: left;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  padding: 4px 10px;
  font-weight: 500;
`;

const UpgradeButton = ({ type, upgrade, config, currency = 0, onPurchase = () => {}, currentValue = '' }) => {
  if (!upgrade || !config) return null;
  
  const canAfford = currency >= upgrade.cost;
  
  return (
    <Button
      onClick={() => onPurchase(type)}
      disabled={!canAfford}
      upgradeType={type}
    >
      {canAfford && <Shine className="upgrade-button-shine" />}
      <ButtonContent>
        <ButtonTop>
          <ButtonInfo>
            <ButtonIcon>{config.icon}</ButtonIcon>
            <ButtonText>
              <ButtonName>{config.name}</ButtonName>
              <ButtonLevel>Level {upgrade.level}</ButtonLevel>
            </ButtonText>
          </ButtonInfo>
          <ButtonCost>{upgrade.cost} $</ButtonCost>
        </ButtonTop>
        <ButtonStats>{currentValue}</ButtonStats>
      </ButtonContent>
    </Button>
  );
};

const UpgradePanel = ({ 
  currency = 0, 
  upgrades = {}, 
  clickPower = 1, 
  passiveIncome = 0, 
  tickRate = 2000, 
  gnomeCount = 1,
  onPurchaseUpgrade 
}) => {
  const upgradeStats = {
    clickPower: `${clickPower} damage per click`,
    passiveIncome: `+${passiveIncome} coins per tick`,
    tickSpeed: `Generate every ${(tickRate / 1000).toFixed(1)}s`,
    gnomes: `${gnomeCount} worker${gnomeCount > 1 ? 's' : ''} (${gnomeCount}x multiplier)`,
  };

  if (!upgrades || Object.keys(upgrades).length === 0) {
    return (
      <Panel>
        <p style={{color: 'white', fontSize: '12px'}}>Loading upgrades...</p>
      </Panel>
    );
  }

  return (
    <Panel>
      <Header>
        <TitleIcon />
        <Title>Upgrades</Title>
      </Header>
      {Object.entries(upgrades)
        .filter(([type]) => UPGRADE_CONFIG[type])
        .map(([type, upgrade]) => (
        <UpgradeButton
          key={type}
          type={type}
          upgrade={upgrade}
          config={UPGRADE_CONFIG[type]}
          currency={currency}
          onPurchase={onPurchaseUpgrade}
          currentValue={upgradeStats[type]}
        />
      ))}
    </Panel>
  );
};

export default UpgradePanel;