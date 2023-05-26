import { formatToTimeZone, parseFromTimeZone } from "date-fns-timezone";
import * as R from "ramda";
import { SAPBooleanSerializer } from "../../../boolean-serializer";

export const serializers: any = [
  { from: "ID", to: "id" },
  { from: "DATE", to: "_date" },
  { from: "TIME", to: "_time" },
  { from: "DESCRIPTION", to: "description" },
  { from: "TYPE", to: "type" },
  { from: "STATUS", to: "status" },
  { from: "UNIT", to: "unit" },
  { from: "CASE", to: "case" },
  { from: "SERVICE", to: "service" },
  {
    from: "OWNER",
    to: "owner",
    serializers: [
      { from: "OWNERID", to: "ownerId" },
      { from: "OWNERNAME", to: "ownerName" },
      { from: "OWNERSURNAME", to: "ownerSurname" },
      { from: "OWNERSPECIALITY", to: "ownerSpeciality" },
      { from: "OWNERJOB", to: "ownerJob" },
    ],
  },
  {
    from: "RELEVANT",
    to: "relevant",
    serializers: [
      { from: "OWNER", to: "owner" },
      { from: "SERVICE", to: "service" },
      { from: "DATE", to: "_date" },
      { from: "TIME", to: "_time" },
      { from: "date" },
    ],
  },
  {
    from: "HAS_INTERNAL_PDF",
    to: "hasInternalPdf",
    serializerFn: SAPBooleanSerializer,
  },
  { from: "URL", to: "url" },
  { from: "PDF", to: "pdf" },
  { from: "CPC", to: "cpc" },
  { from: "PATNR", to: "patientId" },
  // { from: ['DATE', 'TIME'], to: 'dateTime', serializerFn: (date, time) => `${date}${time}` }
];

export const isSAPNull: (value: any) => boolean = (value: any) =>
  value && R.all(R.equals("0"))(value);
export const isNotSAPNull: (value: any) => boolean = R.complement(isSAPNull);
const madridTimeZone = { timeZone: "Europe/Madrid" };
export const dateSAPFormatterCurrentTimeZone = (
  date: Date,
  formatType: string = "YYYYMMDD"
) => formatToTimeZone(date, formatType, madridTimeZone);
export const timeSAPFormatterCurrentTimeZone = (date: Date) =>
  formatToTimeZone(date, "HHmmss", madridTimeZone);
const getSplitDate = (dateNumber: number | String) =>
  [dateNumber.toString().slice(0, 8), dateNumber.toString().slice(8)].join(" ");

export const dateTimeSapSerializer = (date: string, time: string = "000000") =>
  !isSAPNull(date) && !R.isNil(date)
    ? dateSAPParseCurrentTimeZone(`${date} ${time}`)
    : null;

export const dateTimeSapDeserializer = (
  date: Date
): [string | unknown, string | unknown] => [
  date ? dateSAPFormatterCurrentTimeZone(date, "YYYYMMDD") : null,
  date ? dateSAPFormatterCurrentTimeZone(date, "HHmmss") : null,
];

//Esta funcion puede recibir la fecha en diferentes formatos: YYYYMMDDHHMMSS o YYYYMMDD HHMMSS. Se comprueba que formato es y se parsea comprobando previamente que no sea una fecha null de SAP
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

const dataSerializer: any = [
  {
    from: ["DATE", "TIME"],
    to: "date",
    serializerFn: dateTimeSapSerializer,
  },
];

export const SAPSerializers = [
  ...dataSerializer,
  { from: "ID", to: "id" },
  {
    from: "MODIFICATIONDATE",
    to: "modificationDate",
    serializerFn: dateSAPParseCurrentTimeZone,
  },
  {
    from: "CONTENT",
    to: "content",
    serializerFn: (value: string) => {
      const regex = / {21}/gi;
      return value.replace(regex, "<br>");
    },
  },
  { from: "UNIT", to: "unit" },
  { from: "SERVICE", to: "service" },
  { from: "CASE", to: "case" },
  { from: "MASTER_CASE", to: "masterCase" },
  { from: "CENTER", to: "center" },
  { from: "CENTER_DESCRIPTION", to: "centerDescription" },
  { from: "INSTITUTION", to: "institution" },
  { from: "VISITMOVEMENT", to: "visitMovement" },
  {
    from: "RELEVANT",
    to: "relevant",
    serializers: [
      { from: "OWNER", to: "owner" },
      { from: "SERVICE", to: "service" },
      ...dataSerializer,
    ],
  },
  {
    from: "OWNER",
    to: "owner",
    serializers: [
      { from: "OWNERID", to: "ownerId" },
      { from: "OWNERNAME", to: "ownerName" },
      { from: "OWNERSURNAME", to: "ownerSurname" },
      { from: "OWNERSPECIALITY", to: "ownerSpeciality" },
      { from: "OWNERJOB", to: "ownerJob" },
    ],
  },
  { from: "SUBJECTIVE", to: "subjective", serializerFn: SAPBooleanSerializer },
  { from: "REPORTMARK", to: "reportMark", serializerFn: SAPBooleanSerializer },
  { from: "CROSED", to: "crosed", serializerFn: SAPBooleanSerializer },
];
