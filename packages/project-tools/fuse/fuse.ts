import { fusebox, pluginSass, pluginLink, pluginReplace } from 'fuse-box';
import { join, resolve } from 'path';
// import { runUpdateSimulation } from './simulate';

const workspaceRoot = join(__dirname, '../..');
console.log('Workspace Root:', workspaceRoot);

// set AUTOMOD to true to automatically update some files to trigger the watcher
// runUpdateSimulation(!!process.env.AUTOMOD);

export const fuse = (entry: string, baseStyles: string, webIndex: string, devServer: boolean) =>
  fusebox({
    cache: false,
    compilerOptions: {
      tsConfig: 'tsconfig.json',
    },
    devServer,
    hmr: true,
    entry,
    target: 'browser',
    watcher: {
      root: [workspaceRoot],
    },
    stylesheet: {
      macros: {
        '~': join(__dirname, '../../../'),
      },
      autoImport: [{ file: baseStyles, capture: 'packages/*/src' }],
    },
    plugins: [
      pluginSass('*.scss', { asText: true }),
      pluginLink(/.+\.png/, { useDefault: true }),
      pluginLink(/.+\.svg/, { useDefault: true }),
    ],
    webIndex: { template: webIndex },
  });
