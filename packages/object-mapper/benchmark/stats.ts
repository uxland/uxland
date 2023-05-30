const data = require("./results/ccs.json");

const ops = data?.results?.reduce(
  (col, r) => {
    if (r.name.indexOf("UXL") > -1) {
      col["UXL-OBJECT-MAPPER (ops/s)"] = {
        ...col["UXL-OBJECT-MAPPER (ops/s)"],
        [r.name.split(" ")[1]]: r.ops,
      };
      const top = data?.results?.find(
        (t) => t.name === r.name.split("UXL-")[1]
      )?.ops;
      col["GAIN"] = {
        ...col["GAIN"],
        [r.name.split(" ")[1]]: `${parseFloat(
          ((1 - r.ops / top) * 100).toFixed(2)
        )}%`,
      };
    } else
      col["OBJECT-MAPPER (ops/s)"] = {
        ...col["OBJECT-MAPPER (ops/s)"],
        [r.name.split(" ")[1]]: r.ops,
      };
    return col;
  },
  {
    "OBJECT-MAPPER (ops/s)": [],
    "UXL-OBJECT-MAPPER (ops/s)": [],
    GAIN: [],
  }
);

console.table(ops);
