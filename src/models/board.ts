import dbPromise from "./db";
import { TrelloBoard } from "types/trello";

export const insertOrReplace = async (board: TrelloBoard) => {
  const db = await dbPromise;

  return db.run(
    "INSERT OR REPLACE INTO `board` (id, name, description, short_url) VALUES (?, ?, ?, ?)",
    board.id,
    board.name,
    board.desc,
    board.shortUrl
  );
};

export const findById = async (boardId: string) => {
  const db = await dbPromise;

  return db.get("SELECT * FROM `board` WHERE id = ?", boardId);
};

export const findAll = async (boardId: string) => {
  const db = await dbPromise;

  return db.get("SELECT * FROM `board`");
};
