import dbPromise from "./db";
import { TrelloMember } from "types/trello";

export const insertOrReplace = async (member: TrelloMember) => {
  const db = await dbPromise;

  return db.run(
    "INSERT OR REPLACE INTO `member` (id, avatar_url, full_name, initials, username) VALUES (?, ?, ?, ?, ?)",
    member.id,
    member.avatarUrl,
    member.fullName,
    member.initials,
    member.username
  );
};

export const findAll = async () => {
  const db = await dbPromise;

  return db.all("SELECT * FROM `member`");
};

export const findByBoardId = async (boardId: string) => {
  const db = await dbPromise;

  return db.all(
    `SELECT member.* FROM card
    INNER JOIN
      card_member 
    ON
      card.id  = card_member.card_id
    INNER JOIN 
      member
    ON
      card_member.member_id = member.id
    WHERE
      card.board_id = ?
    GROUP BY
      member.id`,
    boardId
  );
};
