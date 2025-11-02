// constants.js
export const GAME_CONFIG = {
  INITIAL_CURRENCY: 0,
  INITIAL_CLICK_POWER: 1,
  INITIAL_PASSIVE_INCOME: 0,
  INITIAL_TICK_RATE: 2000, // milliseconds
  INITIAL_TREE_HEALTH: 10,
  INITIAL_GNOME_COUNT: 1,
  
  COIN_DROP_CHANCE: 0.4, // 40% chance
  COIN_DROP_INTERVAL: 2000, // Check every 3 seconds
  COIN_DESPAWN_TIME: 10000, // Coins disappear after 10 seconds
  COIN_MIN_VALUE: 5,
  COIN_MAX_VALUE: 25,
  
  POPUP_DURATION: 2000, // How long popups stay visible
  
  TREE_BONUS_MULTIPLIER: 5, // Bonus when tree is cut down
  TREE_HEALTH_INCREMENT: 10, // Health increase per 100 currency
};

export const UPGRADE_CONFIG = {
  clickPower: {
    name: 'Click Power',
    icon: '⚡',
    initialCost: 10,
    costMultiplier: 1.8,
    powerMultiplier: 1.5,
    description: 'Increase damage and currency per click',
  },
  passiveIncome: {
    name: 'Passive Income',
    icon: '💰',
    initialCost: 25,
    costMultiplier: 1.8,
    incomeMultiplier: 1.3,
    baseIncome: 5,
    description: 'Earn currency automatically over time',
  },
  tickSpeed: {
    name: 'Tick Speed',
    icon: '⏱️',
    initialCost: 50,
    costMultiplier: 1.8,
    speedMultiplier: 0.9, // Lower is faster
    minTickRate: 500,
    description: 'Generate passive income faster',
  },
  gnomes: {
    name: 'Hire Gnome',
    icon: '🧙',
    initialCost: 100,
    costMultiplier: 1.8,
    description: 'Each gnome multiplies your click earnings',
  },
};

export const COLORS = {
  popup: {
    click: 'text-amber-600',
    passive: 'text-blue-500',
    coin: 'text-yellow-500',
    tree: 'text-green-600',
  },
};
