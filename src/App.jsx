// App.jsx
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { useGameLogic } from './logic/gameLogic';
import CurrencyDisplay from './components/CurrencyDisplay';
import UpgradePanel from './components/UpgradePanel';
import Tree from './components/Tree';
import GnomeWorkers from './components/GnomeWorkers';
import CurrencyPopupContainer from './components/CurrencyPopup';
import CoinDropContainer from './components/CoinDrop';
import Instructions from './components/Instructions';

const globalStyles = css`
  * {
    font-family: 'Silkscreen', monospace;
  }
`;

// ====== BACKGROUND ======
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

// ====== GAME BOX ======
const GameBox = styled.div`
  position: relative;
  background: linear-gradient(160deg, #fefce8, #f5f3c8);
  border-radius: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  padding: 40px 60px;
  height: 75vh;
  margin: 0 200px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  overflow: hidden;

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

// ====== LEFT + RIGHT WRAPPERS ======
const LeftSide = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 3;
`;

const RightSide = styled.div`
  flex: 0.8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
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
    <>
      <Global styles={globalStyles} />
      <BodyWrapper>
        <GameBox>
          {/* Left side: Forest Scene */}
          <LeftSide>
            <Tree
              health={treeHealth}
              maxHealth={maxTreeHealth}
              onCut={cutTree}
              isShaking={shakeTree}
            />
            <GnomeWorkers count={gnomeCount} />
            <Instructions />
            
            {/* Floating visuals - left side only */}
            <CurrencyPopupContainer popups={currencyPopups} />
            <CoinDropContainer coins={coinDrops} onCollect={collectCoin} />
          </LeftSide>

          <RightSide>
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
          </RightSide>
        </GameBox>
      </BodyWrapper>
    </>
  );
}