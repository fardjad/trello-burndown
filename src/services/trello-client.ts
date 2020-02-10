import got, { Got } from "got";

import { TRELLO_API_KEY, TRELLO_API_TOKEN } from "../config/trello";

class TrelloClient {
  private apiKey: string;
  private apiToken: string;
  private baseUrl: string;
  private got: Got;

  constructor(
    apiKey: string,
    apiToken: string,
    baseUrl: string = "https://api.trello.com"
  ) {
    this.apiKey = apiKey;
    this.apiToken = apiToken;
    this.baseUrl = baseUrl;

    this.got = got.extend({
      searchParams: {
        key: this.apiKey,
        token: this.apiToken
      }
    });
  }

  getCard(cardId: string) {
    return this.got
      .get(`${this.baseUrl}/1/cards/${cardId}/`, {
        searchParams: {
          actions: "createCard,updateCard"
        }
      })
      .json();
  }

  getBoard(boardId: string) {
    return this.got
      .get(`${this.baseUrl}/1/boards/${boardId}/`, {
        searchParams: {
          cards: "visible",
          card_fields: [
            "id",
            "dateLastActivity",
            "desc",
            "idMembers",
            "labels",
            "name",
            "pos",
            "shortUrl"
          ].join(","),
          card_members: "true",
          card_member_fields: "all",
          members: "all",
          member_fields: [
            "id",
            "avatarUrl",
            "fullName",
            "initials",
            "username"
          ].join(",")
        }
      })
      .json();
  }
}

export default new TrelloClient(TRELLO_API_KEY, TRELLO_API_TOKEN);
