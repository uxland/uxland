import "reflect-metadata";
import { describe, it } from "vitest";
import { serialize } from "../../ramda/_serialize";
import { serialize as serializeNoRamda } from "../../serialize";
import { SAP } from "../unit/data/sap";
import { SAPSerializers } from "../unit/sap/serializers";
const performance = require("perf_hooks").performance;

const deleteUndefined = (i) => {
  Object.keys(i).forEach((key) => {
    if (typeof i[key] === "object") deleteUndefined(i[key]);
    else i[key] === undefined && delete i[key];
  });
  return i;
};

describe("Benchmarks", () => {
  it("Benchmark: object serialization object-mapper vs json-object-mapper", () => {
    /* PREVALIDATION */
    const input = SAP;
    // let result = serialize(input, SAPSerializers);
    // result = Object.values(result).map((obj) => deleteUndefined(obj));
    // expect(result).toStrictEqual(SAPOutput);

    /* BENCHMARK */
    const times = {
      uxl: [] as number[],
      noRamda: [] as number[],
    };
    for (let j = 0; j < 1000; j++) {
      const input = SAP;
      const t1 = performance.now();
      serialize(input, SAPSerializers);
      const t2 = performance.now();
      serializeNoRamda(input, SAPSerializers);
      const t3 = performance.now();
      times.uxl.push(t2 - t1);
      times.noRamda.push(t3 - t2);
    }

    const means = {
      uxl: times.uxl.reduce((acc, time) => (acc += time), 0) / times.uxl.length,
      noRamda:
        times.noRamda.reduce((acc, time) => (acc += time), 0) /
        times.noRamda.length,
    };
    console.table(means);
    // const fastest =
    //   means.uxl < means.set && means.uxl < means.json
    //     ? "uxl"
    //     : means.set < means.uxl && means.set < means.json
    //     ? "set"
    //     : "json";
    // const results = {
    //   uxl: { meanTime: means.uxl, ratio: means.uxl / means[fastest] },
    //   set: { meanTime: means.set, ratio: means.set / means[fastest] },
    //   json: { meanTime: means.json, ratio: means.json / means[fastest] },
    // };
    // console.table(results);
  });
});
