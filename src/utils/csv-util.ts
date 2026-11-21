import fs from "fs";
import { parse } from "csv-parse/sync";

export class CSVHelper {
  static readCsv(filePath: string): Record<string, string>[] {
    return parse(fs.readFileSync(filePath, "utf-8"), {
      columns: true, //first we will always conside as header.
      skip_empty_lines: true,
      trim: true, // trim spaces
    }) as unknown as Record<string, string>[];
  }
}
