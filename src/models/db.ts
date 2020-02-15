import { DB_FILE } from "../config/db";
import sqlite from "sqlite";
import recoverable from "../services/recoverable";

const dbPromise = sqlite.open(DB_FILE, { cached: true });

export const transaction = recoverable(defer => async (fn: Function) => {
  defer(async recover => {
    const err = recover();
    if (err) {
      await db.exec("ROLLBACK");
      throw err;
    }
    return db.exec("COMMIT");
  });

  const db = await dbPromise;
  await db.exec("BEGIN TRANSACTION");
  return fn();
});

export default dbPromise;
