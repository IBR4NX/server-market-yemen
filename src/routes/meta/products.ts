import { Request, Response, Router } from "express";

import pool from "../../database";
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { categoryId, includeInactive, search } = req.query;
    console.log(req.query, req.body);

    const result = await pool.query(
      "select * from get_products($1::uuid, $2::uuid,$3::boolean, $3::text);",
      [categoryId ?? null, null, includeInactive, search ?? null],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to get products").send(res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, category_id, quantity, unit } = req.body;
    const result = await pool.query(
      "select * from create_product($1::varchar, $2::uuid, $3::numeric, $4::varchar);",
      [name, category_id, quantity, unit],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to create product").send(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { name, category_id, quantity, unit, is_active } = req.body;
    const result = await pool.query(
      "select * from update_product($1::uuid, $2::varchar, $3::uuid, $4::numeric, $5::varchar, $6::boolean);",
      [
        req.params.id,
        name ?? null,
        category_id ?? null,
        quantity ?? null,
        unit ?? null,
        is_active ?? null,
      ],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch {
    return new InternalErrorResponse("Failed to update product").send(res);
  }
});

export default router;
