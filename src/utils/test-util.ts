import { parse } from 'csv-parse/sync'
import fs from 'fs';
export class CSVHelper{
    static readCsv(filePath:string):Record<string,string>[]{
        return parse(fs.readFileSync(filePath, "utf-8"), {
            columns: true,
            trim:true
        })as unknown as Record<string,string>[]
    }
}