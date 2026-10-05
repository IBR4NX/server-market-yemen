import { Router, Request, Response } from "express";
import pool from "@/database";
import {InternalErrorResponse } from "@/core/ApiResponse";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    var message;
    try {
        const { search } = req.query;
        const result = await pool.query("");

    } catch (error) {
        message = "Failed to get information";
         console.error(error);
        return new InternalErrorResponse(message).send(res);
    }
});

export default router;