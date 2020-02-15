import dbPromise from "./db";
import { TrelloCardAction } from "types/trello";

export const findNewestId = async (boardId: string) => {
  const db = await dbPromise;

  return db
    .get(
      "SELECT id from `action` WHERE board_id = ? ORDER BY date DESC LIMIT 1",
      boardId
    )
    .then(rows => rows?.id);
};

export const insertOrReplace = async (action: TrelloCardAction) => {
  const db = await dbPromise;

  return db.run(
    "INSERT OR REPLACE INTO `action` (id, member_id, old_name, name, type, date, card_id, board_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    action.id,
    action.idMemberCreator,
    action.data.old?.name,
    action.data.card.name,
    action.type,
    action.date,
    action.data.card.id,
    action.data.board.id
  );
};

export const findByBoardId = async (boardId: string) => {
  const db = await dbPromise;

  return db.all(
    "SELECT id, member_id, old_name, name, type, datetime(date, 'localtime') as date, card_id, board_id FROM `action` WHERE board_id = ? ORDER BY date DESC",
    boardId
  );
};
