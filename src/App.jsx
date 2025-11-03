// App.jsx
import styled from '@emotion/styled';
import { Global, css } from '@emotion/react';
import { useGameLogic } from './logic/GameLogic';
import CurrencyDisplay from './components/CurrencyDisplay';
import UpgradePanel from './components/UpgradePanel';
import Tree from './components/Tree';
import GnomeWorkers from './components/GnomeWorkers';
import CurrencyPopupContainer from './components/CurrencyPopup';
import CoinDropContainer from './components/CoinDrop';
import Instructions from './components/Instructions';
import URLShortener from './components/UrlShortener';

const globalStyles = css`
  * {
    font-family: 'Silkscreen', monospace;
  }
`;

// ====== BACKGROUND ======
const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(60deg, #253c15ff 10%, #146627ff 30%, #8b5d13ff 60%, #d45b1eff 100%);
  display: flex;
  align-items: center; 
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// ====== GAME BOX ======
const GameBox = styled.div`
  position: relative;
  width: 50%;
  height: 65%;
  background: linear-gradient(160deg, #fefce8, #f5f3c8);
  border-radius: 28px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  padding: 50px;
  margin: 20px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 100px;
  // overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image:
      repeating-linear-gradient(
        45deg,
        rgba(101, 67, 33, 0.08) 0px,
        rgba(101, 67, 33, 0.08) 2px,
        transparent 2px,
        transparent 4px
      ),
      repeating-linear-gradient(
        -45deg,
        rgba(80, 50, 20, 0.06) 0px,
        rgba(80, 50, 20, 0.06) 3px,
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
    border: 2px solid rgba(210, 180, 140, 0.3);
    pointer-events: none;
    z-index: 2;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// ====== LEFT + RIGHT WRAPPERS ======
const LeftSide = styled.div`
  flex: 1.4;
  display: flex;
  flex-direction: column;
  height: 65vh;
  align-items: center;
  background: linear-gradient(135deg, #4a2c0f 0%, #6b4423 50%, #8b5a3c 100%);
  border: 10px solid #2c1810;
  border-radius: 28px;
  justify-content: center;
  gap: 20px;
  position: relative;
  z-index: 3;
  box-shadow: 0 8px 32px rgba(74, 44, 15, 0.6),
              inset 0 2px 4px rgba(210, 180, 140, 0.15);
`;

const RightSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 65vh;
  gap: 2vh;
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
        <URLShortener />
        <GameBox>
          {/* Left side: Forest Scene */}
          <LeftSide>
            <Instructions />
            <Tree
              health={treeHealth}
              maxHealth={maxTreeHealth}
              onCut={cutTree}
              isShaking={shakeTree}
            />
            <GnomeWorkers count={gnomeCount} />
            
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