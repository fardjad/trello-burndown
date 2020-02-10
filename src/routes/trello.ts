import { Router } from "express";
import trelloClient from "../services/trello-client";
import { processBoard } from "../services/trello-utils";
import { TrelloBoard } from "trello";

const router = Router();
router.get("/board/:boardId", async (req, res) => {
  const trelloBoard = (await trelloClient.getBoard(
    req.params.boardId
  )) as TrelloBoard;

  res.json(processBoard(trelloBoard));
});

export default router;
