import { useState, useEffect, useRef, useCallback } from 'react';
import { GAME_CONFIG, UPGRADE_CONFIG } from '../utils/constants';

export const useGameLogic = () => {
  // Core game state
  const [currency, setCurrency] = useState(GAME_CONFIG.INITIAL_CURRENCY);
  const [clickPower, setClickPower] = useState(GAME_CONFIG.INITIAL_CLICK_POWER);
  const [passiveIncome, setPassiveIncome] = useState(GAME_CONFIG.INITIAL_PASSIVE_INCOME);
  const [tickRate, setTickRate] = useState(GAME_CONFIG.INITIAL_TICK_RATE);
  const [treeHealth, setTreeHealth] = useState(GAME_CONFIG.INITIAL_TREE_HEALTH);
  const [gnomeCount, setGnomeCount] = useState(GAME_CONFIG.INITIAL_GNOME_COUNT);
  const [maxTreeHealth, setMaxTreeHealth] = useState(GAME_CONFIG.INITIAL_TREE_HEALTH);
  
  // Upgrades state
  const [upgrades, setUpgrades] = useState({
    clickPower: { 
      level: 0, 
      cost: UPGRADE_CONFIG.clickPower.initialCost 
    },
    passiveIncome: { 
      level: 0, 
      cost: UPGRADE_CONFIG.passiveIncome.initialCost 
    },
    tickSpeed: { 
      level: 0, 
      cost: UPGRADE_CONFIG.tickSpeed.initialCost 
    },
    gnomes: { 
      level: 0, 
      cost: UPGRADE_CONFIG.gnomes.initialCost 
    }
  });

  // Visual effects state
  const [currencyPopups, setCurrencyPopups] = useState([]);
  const [coinDrops, setCoinDrops] = useState([]);
  const [shakeTree, setShakeTree] = useState(false);
  
  // Refs for unique IDs
  const popupIdRef = useRef(0);
  const coinIdRef = useRef(0);

  // Calculate click power based on tree cut
  const cutTree = useCallback(() => {
    setShakeTree(true);
    setTimeout(() => setShakeTree(false), 200);
    
    const damage = clickPower;
    const income = clickPower * gnomeCount;
    
    setCurrency(prev => prev + income);
    
    setTreeHealth(prev => {
      const newHealth = prev - damage;
      if (newHealth <= 0) {
        // Tree cut down! Bonus currency
        const bonus = income * GAME_CONFIG.TREE_BONUS_MULTIPLIER;
        setCurrency(c => c + bonus);
        createCurrencyPopup(bonus, 'tree');
        
        // Respawn tree with more health
        const newMaxHealth = GAME_CONFIG.INITIAL_TREE_HEALTH + 
          Math.floor(currency / 100) * GAME_CONFIG.TREE_HEALTH_INCREMENT;
        setMaxTreeHealth(newMaxHealth);
        return newMaxHealth;
      }
      return newHealth;
    });
    
    createCurrencyPopup(income, 'click');
  }, [clickPower, gnomeCount, currency]);

  // Create floating currency popup
  const createCurrencyPopup = useCallback((amount, type) => {
    const id = popupIdRef.current++;
    const x = type === 'passive' 
      ? Math.random() * 80 + 10 
      : Math.random() * 60 + 20;
    const y = type === 'passive'
      ? Math.random() * 60 + 10
      : Math.random() * 40 + 30;
    
    const popup = { id, amount, x, y, type };
    setCurrencyPopups(prev => [...prev, popup]);
    
    setTimeout(() => {
      setCurrencyPopups(prev => prev.filter(p => p.id !== id));
    }, GAME_CONFIG.POPUP_DURATION);
  }, []);

  // Spawn collectible coin
  const spawnCoin = useCallback(() => {
    const id = coinIdRef.current++;
    const x = Math.random() * 85 + 5;
    const y = Math.random() * 70 + 10;
    const value = Math.floor(
      Math.random() * (GAME_CONFIG.COIN_MAX_VALUE - GAME_CONFIG.COIN_MIN_VALUE)
    ) + GAME_CONFIG.COIN_MIN_VALUE;
    
    const coin = { id, x, y, value };
    setCoinDrops(prev => [...prev, coin]);
    
    setTimeout(() => {
      setCoinDrops(prev => prev.filter(c => c.id !== id));
    }, GAME_CONFIG.COIN_DESPAWN_TIME);
  }, []);

  // Collect coin when clicked
  const collectCoin = useCallback((coin) => {
    setCurrency(prev => prev + coin.value);
    createCurrencyPopup(coin.value, 'coin');
    setCoinDrops(prev => prev.filter(c => c.id !== coin.id));
  }, [createCurrencyPopup]);

  // Purchase upgrade
  const purchaseUpgrade = useCallback((type) => {
    const upgrade = upgrades[type];
    const config = UPGRADE_CONFIG[type];
    
    if (currency >= upgrade.cost) {
      setCurrency(prev => prev - upgrade.cost);
      
      const newLevel = upgrade.level + 1;
      const newCost = Math.floor(upgrade.cost * config.costMultiplier);
      
      setUpgrades(prev => ({
        ...prev,
        [type]: { level: newLevel, cost: newCost }
      }));

      // Apply upgrade effects
      switch(type) {
        case 'clickPower':
          setClickPower(prev => Math.floor(prev * config.powerMultiplier));
          break;
        case 'passiveIncome':
          setPassiveIncome(prev => 
            prev + Math.floor(config.baseIncome * Math.pow(config.incomeMultiplier, newLevel))
          );
          break;
        case 'tickSpeed':
          setTickRate(prev => 
            Math.max(config.minTickRate, Math.floor(prev * config.speedMultiplier))
          );
          break;
        case 'gnomes':
          setGnomeCount(prev => prev + 1);
          break;
      }
    }
  }, [currency, upgrades]);

  // Passive income generation
  useEffect(() => {
    if (passiveIncome > 0) {
      const interval = setInterval(() => {
        setCurrency(prev => prev + passiveIncome);
        createCurrencyPopup(passiveIncome, 'passive');
      }, tickRate);
      return () => clearInterval(interval);
    }
  }, [passiveIncome, tickRate, createCurrencyPopup]);

  // Random coin drops
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < GAME_CONFIG.COIN_DROP_CHANCE) {
        spawnCoin();
      }
    }, GAME_CONFIG.COIN_DROP_INTERVAL);
    return () => clearInterval(interval);
  }, [spawnCoin]);

  return {
    // Game state
    currency,
    clickPower,
    passiveIncome,
    tickRate,
    treeHealth,
    maxTreeHealth,
    gnomeCount,
    upgrades,
    
    // Visual effects
    currencyPopups,
    coinDrops,
    shakeTree,
    
    // Actions
    cutTree,
    collectCoin,
    purchaseUpgrade,
  };
};