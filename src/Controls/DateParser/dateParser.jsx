import { parse, isValid } from "date-fns";

export async function dateParser(input) {
  if (!input) return null;

  const formats = [
    "M/d/yyyy h:mm:ss a",       // 8/17/2025 7:00:00 PM
    "dd/MM/yyyy HH:mm:ss",      // 25/08/2025 09:41:35
    "yyyy-MM-dd'T'HH:mm:ss",    // 2025-09-04T18:29:00
    "dd/MMM/yyyy hh:mm:ss a",   // 09/Apr/2025 06:29:15 PM
    "yyyy-MM-dd'T'HH:mm:ss.SSSX", // 2025-09-05T12:37:08.141Z
  ];

  for (const fmt of formats) {
    const parsed = parse(input, fmt, new Date());
    if (isValid(parsed)) {
      return parsed;
    }
  }

  return null;
}