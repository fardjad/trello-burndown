import dbPromise from "./db";
import { TrelloCard } from "types/trello";

export const insertOrReplace = async (boardId: string, card: TrelloCard) => {
  const db = await dbPromise;

  await db.run(
    `DELETE
     FROM
     	card_member
     WHERE
     	card_id IN (
     	SELECT
     		card_id
     	FROM
     		card_member
     	INNER JOIN card ON
     		card_member.card_id = card.id
     	WHERE
     		card.board_id = ?);`,
    boardId
  );
  await db.run("DELETE FROM card WHERE board_id = ?", boardId);

  await Promise.all(
    card.idMembers.map(idMember =>
      db.run(
        "INSERT INTO `card_member` (card_id, member_id) VALUES (?, ?)",
        card.id,
        idMember
      )
    )
  );

  return db.run(
    "INSERT INTO `card` (id, date_last_activity, description, name, pos, short_url, board_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    card.id,
    card.dateLastActivity,
    card.desc,
    card.name,
    card.pos,
    card.shortUrl,
    boardId
  );
};

export const findAll = async () => {
  const db = await dbPromise;

  return db.all("SELECT * FROM `card`");
};

export const findByBoardId = async (boardId: string) => {
  const db = await dbPromise;

  return db.all("SELECT * FROM `card` WHERE board_id = ?", boardId);
};
