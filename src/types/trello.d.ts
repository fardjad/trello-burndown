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
  };
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
  actions?: TrelloCardAction[];
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

export type ProcessedTrelloCardAction = Merge<
  ExcludeKeyFromType<TrelloCardAction, "idMemberCreator">,
  {
    memberCreator: TrelloMember;
  }
>;

export type ProcessedTrelloCard = Merge<
  ExcludeKeyFromType<TrelloCard, "idMembers" | "actions">,
  {
    members: TrelloMember[];
    actions?: [ProcessedTrelloCardAction];
    estimated?: number;
    consumed?: number;
  }
>;

export type ProcessedTrelloBoard = Merge<
  TrelloBoard,
  {
    cards: ProcessedTrelloCard[];
    cardsPerUser: {
      [key: string]: ProcessedTrelloCard[];
    };
  }
>;
