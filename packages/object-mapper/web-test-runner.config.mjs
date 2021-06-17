import { esbuildPlugin } from "@web/dev-server-esbuild";
import { importMapsPlugin } from "@web/dev-server-import-maps";

export default {
  plugins: [
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
  port: 4006,
};
