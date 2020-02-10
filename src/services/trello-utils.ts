import {
  TrelloMember,
  TrelloCard,
  ProcessedTrelloBoard,
  TrelloBoard,
  ProcessedTrelloCard
} from "trello";

const estimatedRegexp = /((?:^|\s?))\((\x3f|\d*\.?\d+)(\))\s?/m;
const consumedRegexp = /((?:^|\s?))\[(\x3f|\d*\.?\d+)(\])\s?/m;

const safeParseInt = (str: string, radix = 10) =>
  /^\d+/.test(str) ? parseInt(str, radix) : undefined;

export const processBoard = (
  trelloBoard: TrelloBoard
): ProcessedTrelloBoard => {
  const members: { [key: string]: TrelloMember } = trelloBoard.members.reduce(
    (acc, member) => {
      return { ...acc, [member.id]: member };
    },
    {}
  );

  const cards = trelloBoard.cards.map(
    (card: TrelloCard): ProcessedTrelloCard => {
      const estimated = safeParseInt(
        (card.name.match(estimatedRegexp) || [])[2]
      );
      const consumed = safeParseInt((card.name.match(consumedRegexp) || [])[2]);

      return {
        id: card.id,
        dateLastActivity: card.dateLastActivity,
        desc: card.desc,
        labels: card.labels,
        name: card.name,
        shortUrl: card.shortUrl,
        pos: card.pos,
        members: card.idMembers.map(idMember => members[idMember]),
        estimated,
        consumed
      };
    }
  );

  const cardsPerUser = cards.reduce(
    (
      acc: { [key: string]: ProcessedTrelloCard[] },
      card: ProcessedTrelloCard
    ) => {
      let key;

      if (card.members.length === 0) {
        key = "UNASSIGNED";
      } else {
        key = card.members[0].id;
      }

      if (acc[key] == null) {
        acc[key] = [];
      }
      acc[key].push(card);

      return acc;
    },
    {}
  );

  return {
    id: trelloBoard.id,
    desc: trelloBoard.desc,
    name: trelloBoard.name,
    shortUrl: trelloBoard.shortUrl,
    cards,
    cardsPerUser,
    members: trelloBoard.members
  };
};
