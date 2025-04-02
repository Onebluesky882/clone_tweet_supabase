import { Database as DB, Database } from "./database.types";

declare global {
  type Database = DB;
}
