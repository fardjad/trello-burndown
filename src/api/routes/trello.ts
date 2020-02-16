import { Router } from "express";
import { getBoard, listBoards, syncBoard } from "../controllers/trello";

const router = Router();

router.get("/boards", listBoards);
router.get("/boards/:boardId", getBoard);
router.post("/boards/:boardShortId/sync", syncBoard);

export default router;
