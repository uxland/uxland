const PATIENT_EXTENDED_CCS = require("./data/patient-ccs-extended_yes.json");
const NURSING_CCS = require("./data/nursing-ccs.json");
const CASE_CCS = require("./data/case-ccs.json");
const serializers = require("./data/serializers");
// const performance = require("perf_hooks").performance;
const b = require("benny");

const patientCcs = PATIENT_EXTENDED_CCS;
const nursingCcs = NURSING_CCS;
const caseCcs = CASE_CCS;

b.suite(
  "CCS",
  b.add("OBJECT-MAPPER PATIENT", () =>
    serializers.mapClinicalCourses(patientCcs)
  ),
  b.add("UXL-OBJECT-MAPPER PATIENT", () =>
    serializers.ramdaMapClinicalCourses(patientCcs)
  ),
  b.add("OBJECT-MAPPER NURSING", () =>
    serializers.mapClinicalCourses(nursingCcs)
  ),
  b.add("UXL-OBJECT-MAPPER NURSING", () =>
    serializers.ramdaMapClinicalCourses(nursingCcs)
  ),
  b.add("OBJECT-MAPPER CASE", () => serializers.mapClinicalCourses(caseCcs)),
  b.add("UXL-OBJECT-MAPPER CASE", () =>
    serializers.ramdaMapClinicalCourses(caseCcs)
  ),
  b.cycle(),
  b.complete(),
  b.save({ file: "ccs", version: "1.0.0" }),
  b.save({ file: "ccs", format: "chart.html" })
);

// b.suite(
//   "NURSING",
//   b.add("OBJECT-MAPPER", () => serializers.mapClinicalCourses(nursingCcs)),
//   b.add("UXL-OBJECT-MAPPER", () =>
//     serializers.ramdaMapClinicalCourses(nursingCcs)
//   ),
//   b.cycle(),
//   b.complete(),
//   b.save({ file: "nursing-ccs", version: "1.0.0" }),
//   b.save({ file: "nursing-ccs", format: "chart.html" })
// );

// b.suite(
//   "CASE CCS",
//   b.add("OBJECT-MAPPER", () => serializers.mapClinicalCourses(caseCcs)),
//   b.add("UXL-OBJECT-MAPPER", () =>
//     serializers.ramdaMapClinicalCourses(caseCcs)
//   ),
//   b.cycle(),
//   b.complete(),
//   b.save({ file: "case-ccs", version: "1.0.0" }),
//   b.save({ file: "case-ccs", format: "chart.html" })
// );

// const caseResults = require("../../benchmark/results/case-ccs.json");
// const nursingResults = require("../../benchmark/results/nursing-ccs.json");
// const patientResults = require("../../benchmark/results/patient-ccs-extended.json");

// const parseResults = {
//   patientNew: patientResults.results,
//   nursing: nursingResults.results,
//   case: caseResults.results,
// };
// console.log(parseResults);
