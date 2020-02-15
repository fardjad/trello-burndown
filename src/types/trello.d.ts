export interface TrelloLabel {
  id: string;
  idBoard: string;
  name: string;
  color: string;
}

export interface TrelloCardAction {
  id: string;
  idMemberCreator: string;
  type: "createCard" | "updateCard";
  date: string;
  data: {
    old?: {
      name?: string;
    };
    card: {
      id: string;
      name: string;
    };
    board: {
      id: string;
      name: string;
      shortLink: string;
    };
  };
  memberCreator: TrelloMember;
}

export interface TrelloCard {
  id: string;
  dateLastActivity: string;
  desc: string;
  name: string;
  pos: number;
  idMembers: string[];
  labels: TrelloLabel[];
  shortUrl: string;
}

export interface TrelloMember {
  id: string;
  avatarUrl: string;
  fullName: string;
  initials: string;
  username: string;
}

export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  shortUrl: string;
  cards: TrelloCard[];
  members: TrelloMember[];
}
