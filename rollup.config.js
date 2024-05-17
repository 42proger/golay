import { copy } from 'fs-extra';

export default {
  input: "./src/main.js",
  output: {
    file: "dist/index.js",
    format: "iife",
  },
  plugins: [
    copyAssets(),
  ],
};

function copyAssets() {
  return {
    name: 'copy-assets',
    writeBundle() {
      copy('./src/assets', './dist/assets');
      copy('./index.html', './dist/index.html');
    }
  };
}
