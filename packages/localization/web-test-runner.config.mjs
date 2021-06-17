import { esbuildPlugin } from "@web/dev-server-esbuild";
import { importMapsPlugin } from "@web/dev-server-import-maps";
import rollupCommonjs from "@rollup/plugin-commonjs";
import { fromRollup } from "@web/dev-server-rollup";
const commonjs = fromRollup(rollupCommonjs);

export default {
  testRunnerHtml: (testFramework) =>
    `<html>
      <body>
        <script>var exports = {};</script>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
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
