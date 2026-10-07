import { Request, Response, Router } from "express";

import pool from "../../database";
import {
  InternalErrorResponse,
  NotFoundResponse,
  SuccessResponse,
} from "../../core/ApiResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  console.log("ssssggg");
  try {
    const { categoryId, includeInactive, search } = req.query;

    const result = await pool.query(
      "select * from get_products($1::uuid, $2::uuid, $3::text ,$4::boolean);",
      [categoryId ?? null, null,  search ?? null,includeInactive??null],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch (error) {
    console.error(error);
    return new InternalErrorResponse("Failed to get products").send(res);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, category_name,description, quantity, unit } = req.body;

    const result = await pool.query(
      "select * from create_product($1::varchar,$2::varchar, $3::text, $4::numeric, $5::varchar);",
      [category_name,name,description, quantity, unit],
    );

    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch(err) {
    console.error(err);
    return new InternalErrorResponse("Failed to create product").send(res);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  try {
    const { name, category_name,description, quantity, unit, is_active } = req.body;
            console.log("ggg", req.body);

    const result = await pool.query(
      "select * from update_product($1::uuid, $2::varchar, $3::varchar,$4::text, $5::numeric, $6::varchar, $7::boolean);",
      [
        req.params.id,
        category_name ?? null,
        name ?? null,
        description??null,
        quantity ?? null,
        unit ?? null,
        is_active ?? null,
      ],
    );
    console.log(result.rows)
    if (result.rows.length > 0) {
      return new SuccessResponse("successful", result.rows).send(res);
    }

    return new NotFoundResponse("No data found").send(res);
  } catch(err) {
    console.error(err);
    return new InternalErrorResponse("Failed to update product").send(res);
  }
});

export default router;
