import { defineMiniApp } from '@exercise/mini-app-sdk';

import pkg from './package.json';
import { CalorieCounterApp } from './src/App';

export default defineMiniApp({
  id: 'calorie-counter',
  name: 'Đếm calo',
  emoji: '🔥',
  color: '#FF3B30',
  version: pkg.version,
  component: CalorieCounterApp,
});
