import { Request, Response, Router } from "express";
import pool from "../../database";
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";

const router = Router();
const user_email = "admin@example.com";
const employee_id = "1b411cfa-0142-4b30-8216-93e7e240f6f8";

router.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "select * from get_pending_submissions();",
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }
    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse(
      "Failed to get pending price submissions",
    ).send(res);
  }
});

router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const status =typeof req.query.status === "string" ? req.query.status : null;

    const result = await pool.query(
      "select * from get_user_submissions($1::uuid, $2::submission_status);",
      [req.params.userId, status],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }
    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse(
      "Failed to get user price submissions",
    ).send(res);
  }
});


router.post("/", async (req: Request, res: Response) => {
  try {
    const { product_name, city_name, price, note } = req.body;
    const result = await pool.query(
      "select * from create_price_submission($1::text, $2::text, $3::text, $4::decimal, $5::text);",
      [product_name, city_name, user_email, price, note ?? null],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }
    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse(
      "Failed to create price submission",
    ).send(res);
  }
});

router.patch("/:id/approve", async (req: Request, res: Response) => {
  try {

    const result = await pool.query(
      "select * from approve_price_submission($1::uuid, $2::uuid);",
      [req.params.id, employee_id],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }
    return new NotFoundResponse("No data found").send(res);
    } catch (error) {
        console.error(error);    
    return new InternalErrorResponse(
      "Failed to approve price submission",
    ).send(res);
  }
});

router.patch("/:id/reject", async (req: Request, res: Response) => {
  try {
    const {  reason } = req.body;

    const result = await pool.query(
      "select * from reject_price_submission($1::uuid, $2::uuid, $3::text);",
      [req.params.id, employee_id, reason],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }
    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse(
      "Failed to reject price submission",
    ).send(res);
  }
});

export default router;
