import { Request, Response, Router } from "express";

import pool from "../../database";
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";

const router = Router();

router.get("/statistics", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("select * from get_dashboard_statistics();");

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows[0]).send(res);
    }

    return new NotFoundResponse("No dashboard statistics found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to get dashboard statistics").send(res);
  }
});

export default router;
