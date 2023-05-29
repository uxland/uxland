import { parseFromTimeZone } from "date-fns-timezone";
import * as R from "ramda";
import { SAPBooleanSerializer } from "../../boolean-serializer";
const madridTimeZone = { timeZone: "Europe/Madrid" };

export const booleanSerializer = (value: string): boolean => value === "X";
export const booleanDeserializer = (value: boolean): string =>
  value ? "X" : "";
const getSplitDate = (dateNumber: number | String) =>
  [dateNumber.toString().slice(0, 8), dateNumber.toString().slice(8)].join(" ");
export const isSAPNull: (value: any) => boolean = (value: any) =>
  value && R.all(R.equals("0"))(value);
export const isNotSAPNull: (value: any) => boolean = R.complement(isSAPNull);

export const dateSAPParseCurrentTimeZone = (
  dateValue: string | number | any
) => {
  if (dateValue) {
    dateValue =
      typeof dateValue === "number" ? dateValue.toString() : dateValue;
    let auxDate = dateValue.split(" ");
    if (auxDate.length == 2) {
      return isNotSAPNull(auxDate[0])
        ? parseFromTimeZone(dateValue, madridTimeZone)
        : null;
    } else if (auxDate.length == 1) {
      return isNotSAPNull(dateValue)
        ? parseFromTimeZone(getSplitDate(dateValue), madridTimeZone)
        : null;
    }
  }
  return null;
};

const instanceSerializers = [
  { from: "ISREL", to: "released", serializerFn: SAPBooleanSerializer },
  { from: "GUID", to: "guid" },
  { from: "ERDAT", to: "creationDate" },
  { from: "ERTIM", to: "creationTime" },
  { from: "ERUSR", to: "creationUser" },
  { from: "NAME1", to: "surname" },
  { from: "NAME2", to: "name" },
  { from: "INSTITUTION", to: "centerId" },
  { from: "EINKB", to: "centerDescription" },
];

const stepSerializers = [
  { from: "STPORDER", to: "stepOrder" },
  { from: "STPID", to: "stepId" },
  { from: "TEXT", to: "text" },
  { from: "STATUS", to: "status" },
  { from: "RELEASED", to: "released", serializerFn: SAPBooleanSerializer },
  { from: "ITERATE", to: "iterate", serializerFn: SAPBooleanSerializer },
  { from: "REQUIRED", to: "required", serializerFn: SAPBooleanSerializer },
  { from: "INSTANCES", to: "instances", serializers: instanceSerializers },
  {
    from: "ACTIVITY_REGISTER_ENABLED",
    to: "activityRegisterEnabled",
    serializerFn: SAPBooleanSerializer,
  },
];

export const processDefinitionSerializers = [
  { from: "PRKEY", to: "prKey" },
  { from: "NAME", to: "name" },
  { from: "PROCID", to: "procId" },
];

export const processSerializers = [
  ...(processDefinitionSerializers as any),
  { from: "BEGDT", to: "beginDate", serializerFn: dateSAPParseCurrentTimeZone },
  { from: "ENDDT", to: "endDate", serializerFn: dateSAPParseCurrentTimeZone },
  { from: "READONLY", to: "readOnly", serializerFn: SAPBooleanSerializer },
  { from: "PRCAT", to: "prcat" },
  {
    from: "DOCUMENTS",
    to: "documents",
    serializers: [{ from: "MODULEID", to: "moduleId" }],
  },
  { from: "STEPS", to: "steps", serializers: stepSerializers },
];

export const diagnosisSerializers = [
  { from: "CODE", to: "code" },
  { from: "CATALOG", to: "catalog" },
  { from: "DESCRIPTION", to: "description" },
];

export const previousSerializers = [
  { from: "PRKEY", to: "prKey" },
  { from: "NAME", to: "name" },
  { from: "PROCID", to: "procId" },
  { from: "BEGDT", to: "beginDate", serializerFn: dateSAPParseCurrentTimeZone },
  { from: "ENDDT", to: "endDate", serializerFn: dateSAPParseCurrentTimeZone },
  {
    from: "ACTIVE",
    to: "active",
    serializerFn: booleanSerializer,
    deserializerFn: booleanDeserializer,
  },
];

export const catalogProcessBaseSerializers = [
  { from: "PRKEY", to: "prKey" },
  { from: "NAME", to: "name" },
  { from: "PROCID", to: "procId" },
  {
    from: "ACTIVE",
    to: "active",
    serializerFn: booleanSerializer,
    deserializerFn: booleanDeserializer,
  },
  { from: "BEGDT", to: "beginDate", serializerFn: dateSAPParseCurrentTimeZone },
  { from: "ENDDT", to: "endDate", serializerFn: dateSAPParseCurrentTimeZone },
  { from: "PRTYP", to: "type" },
];

export const catalogProcessSerializers = [
  ...catalogProcessBaseSerializers,
  { from: "DIAGNOSIS", to: "diagnosis", serializers: diagnosisSerializers },
  { from: "PREVIOUS", to: "previous", serializers: previousSerializers },
  { from: "MHDA", to: "mhda", serializers: catalogProcessBaseSerializers },
];
