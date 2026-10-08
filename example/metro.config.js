// Runs the mini app from the repo root (`..`) inside this standalone Expo app.
const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const projectRoot = __dirname;
const repoRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [repoRoot];

// Resolve react, react-native and the SDK only from example/node_modules...
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, 'node_modules')];
// ...and never from a root node_modules (created by `npm install` for typechecking),
// which would load a second copy of React.
const escape = (p) => p.replace(/[/\\^$*+?.()|[\]{}]/g, '\\$&');
config.resolver.blockList = [
  ...[config.resolver.blockList ?? []].flat(),
  new RegExp(`^${escape(path.join(repoRoot, 'node_modules'))}[/\\\\].*`),
];

module.exports = config;
