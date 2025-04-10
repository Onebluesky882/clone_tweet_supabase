import { Database as db } from "@/lib/database.types";

declare global {
  type Database = db;
  type Tweet = Database["public"]["Tables"]["tweets"]["Row"];
  type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
}
