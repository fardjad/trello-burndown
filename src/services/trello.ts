import got, { Got } from "got";
import { TrelloBoard, TrelloCardAction } from "types/trello";
import RateLimited from "./rate-limited";
import {
  TRELLO_ACTIONS_LIMIT,
  TRELLO_API_KEY,
  TRELLO_API_TOKEN
} from "../config/trello";

interface SearchParams {
  [key: string]: string | boolean | number | null;
}

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

  @RateLimited(1, 500)
  async getBoard(boardShortId: string) {
    const searchParams: SearchParams = {
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
    };

    const board: TrelloBoard = await this.got
      .get(`${this.baseUrl}/1/boards/${boardShortId}/`, {
        searchParams
      })
      .json();

    return board;
  }

  @RateLimited(1, 500)
  async getCardActions(
    boardId: string,
    options?: { since?: string; before?: string }
  ) {
    const searchParams: SearchParams = {
      limit: TRELLO_ACTIONS_LIMIT,
      filter: "all"
    };

    if (options?.before) {
      searchParams.before = options.before;
    }

    if (options?.since) {
      searchParams.since = options.since;
    }

    const actions: any[] = await this.got
      .get(`${this.baseUrl}/1/board/${boardId}/actions`, {
        searchParams
      })
      .json();

    return actions.filter(
      action => action.data.card?.name != null
    ) as TrelloCardAction[];
  }
}

export default new TrelloClient(TRELLO_API_KEY, TRELLO_API_TOKEN);
