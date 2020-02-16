import { Request, Response, NextFunction } from "express";
import { TrelloCardAction } from "types/trello";

import { TRELLO_ACTIONS_LIMIT } from "../../config/trello";
import trello from "../../services/trello";
import recoverable from "../../services/recoverable";
import { transaction } from "../../models/db";
import * as Action from "../../models/action";
import * as Board from "../../models/board";
import * as Card from "../../models/card";
import * as Member from "../../models/member";

const storeActions = async (action: TrelloCardAction[]) => {
  await Promise.all(
    action.map(action => Member.insertOrReplace(action.memberCreator))
  );

  return Promise.all(action.map(action => Action.insertOrReplace(action)));
};

export const syncBoard = recoverable(
  defer => async (req: Request, res: Response, next: NextFunction) => {
    defer(recover => {
      const err = recover();
      if (err) {
        next(err);
      }
    });

    const { boardShortId } = req.params;

    const board = await trello.getBoard(boardShortId);
    await transaction(async () => {
      await Board.insertOrReplace(board);
      await Promise.all(
        board.cards.map(card => Card.insertOrReplace(board.id, card))
      );
      await Promise.all(
        board.members.map(member => Member.insertOrReplace(member))
      );
    });

    await transaction(async () => {
      const newestId = await Action.findNewestId(board.id);
      let actions = await trello.getCardActions(board.id, { since: newestId });
      await storeActions(actions);
      if (actions.length >= TRELLO_ACTIONS_LIMIT) {
        while (actions.length > 0) {
          actions = await trello.getCardActions(board.id, {
            before: actions.slice(-1)[0].id
          });
          await storeActions(actions);
          if (actions.find(d => d.id === newestId) != null) {
            break;
          }
        }
      }
    });

    res.status(204).end();
  }
);

export const getBoard = recoverable(
  defer => async (req: Request, res: Response, next: NextFunction) => {
    defer(recover => {
      const err = recover();
      if (err) {
        next(err);
      }
    });

    const { boardId } = req.params;

    const board = {
      ...(await Board.findById(boardId)),
      members: await Member.findByBoardId(boardId),
      cards: await Card.findByBoardId(boardId),
      actions: await Action.findByBoardId(boardId)
    };

    res.json(board);
  }
);

export const listBoards = recoverable(
  defer => async (req: Request, res: Response, next: NextFunction) => {
    defer(recover => {
      const err = recover();
      if (err) {
        next(err);
      }
    });

    const boards = await Board.findAll();

    res.json(boards);
  }
);
