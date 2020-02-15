import { Router } from "express";
import { getBoard, syncBoard } from "../controllers/trello";

const router = Router();

router.get("/boards/:boardId", getBoard);
router.post("/boards/:boardShortId/sync", syncBoard);

export default router;
