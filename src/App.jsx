// App.jsx
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useGameLogic } from './logic/gameLogic';
import CurrencyDisplay from './components/CurrencyDisplay';
import UpgradePanel from './components/UpgradePanel';
import Tree from './components/Tree';
import GnomeWorkers from './components/GnomeWorkers';
import CurrencyPopupContainer from './components/CurrencyPopup';
import CoinDropContainer from './components/CoinDrop';
import Instructions from './components/Instructions';

// ====== ANIMATIONS ======
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
`;

const floatSlow = keyframes`
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
`;

// ====== BODY BACKGROUND ======
const BodyWrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
  background: linear-gradient(135deg, #d9f99d 0%, #fef3c7 50%, #a7f3d0 100%);
`;

// ====== MOVING BACKGROUND ELEMENTS ======
const MovingBg = styled.div`
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background: 
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 50%),
    radial-gradient(circle at 70% 70%, rgba(187,247,208,0.3), transparent 50%);
  animation: ${floatSlow} 18s ease-in-out infinite alternate;
  z-index: 0;
`;

// ====== COZY GAME BOX ======
const GameBox = styled.div`
  position: relative;
  background: linear-gradient(160deg, #fefce8, #f5f3c8);
  border-radius: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  padding: 48px;
  width: 960px;        /* increased width */
  max-width: 95vw;
  height: 85vh;        /* slightly taller */
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image:
      repeating-linear-gradient(
        45deg,
        rgba(139, 92, 46, 0.04) 0px,
        rgba(139, 92, 46, 0.04) 2px,
        transparent 2px,
        transparent 4px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(120, 85, 40, 0.03) 0px,
        rgba(120, 85, 40, 0.03) 3px,
        transparent 3px,
        transparent 6px
      );
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    border: 2px solid rgba(255, 255, 255, 0.4);
    pointer-events: none;
    z-index: 2;
  }
`;


// ====== GAME AREA ======
const GameArea = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function TreeClickerGame() {
  const {
    currency,
    clickPower,
    passiveIncome,
    tickRate,
    treeHealth,
    maxTreeHealth,
    gnomeCount,
    upgrades,
    currencyPopups,
    coinDrops,
    shakeTree,
    cutTree,
    collectCoin,
    purchaseUpgrade,
  } = useGameLogic();

  return (
    <BodyWrapper>
      <MovingBg />
      <GameBox>
        <CurrencyDisplay 
          currency={currency}
          passiveIncome={passiveIncome}
          tickRate={tickRate}
        />
        <UpgradePanel
          currency={currency}
          upgrades={upgrades}
          clickPower={clickPower}
          passiveIncome={passiveIncome}
          tickRate={tickRate}
          gnomeCount={gnomeCount}
          onPurchaseUpgrade={purchaseUpgrade}
        />
        <CurrencyPopupContainer popups={currencyPopups} />
        <CoinDropContainer coins={coinDrops} onCollect={collectCoin} />
        <GameArea>
          <Tree 
            health={treeHealth}
            maxHealth={maxTreeHealth}
            onCut={cutTree}
            isShaking={shakeTree}
          />
          <GnomeWorkers count={gnomeCount} />
          <Instructions />
        </GameArea>
      </GameBox>
    </BodyWrapper>
  );
}
