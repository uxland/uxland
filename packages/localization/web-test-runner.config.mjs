import { esbuildPlugin } from "@web/dev-server-esbuild";
import { importMapsPlugin } from "@web/dev-server-import-maps";
import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from "@web/dev-server-rollup";
const commonjs = fromRollup(rollupCommonjs);
import { chromeLauncher } from "@web/test-runner-chrome";

export default {
  testRunnerHtml: (testFramework) =>
    `<html>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
  browsers: [chromeLauncher({ concurrency: 1 })],
  plugins: [
    commonjs({
      include: ["./node_modules/proxyquire/**/*"],
    }),
    esbuildPlugin({ ts: true }),
    importMapsPlugin({
      inject: {
        importMap: {
          imports: {},
        },
      },
    }),
  ],
  coverageConfig: {
    report: true,
    reporters: ["json-summary", "text", "lcov"],
  },
  port: 4005,
};
