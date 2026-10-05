import { Router, Request, Response } from "express";
import pool from "../database";
const router = Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        console.log("Query Parametersssss:", req.query,);
        const { cityName, categoryName, search } = req.query;
        const result = await pool.query(
            `SELECT * FROM get_current_prices($1::text, $2::text, $3::text)`,
            [
                cityName??null,
                categoryName?? null,
                search?? null
            ] 
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error
        });
    }
});


/*
|--------------------------------------------------------------------------
| GET /api/prices/current
| Get current price for one product in one city
|--------------------------------------------------------------------------
| Required:
| ?productId=...
| ?cityId=...
*/
router.get("/current", async (req: Request, res: Response) => {
    try {
        const { productId, cityId } = req.query;

        if (!productId || !cityId) {
            return res.status(400).json({
                success: false,
                message: "productId and cityId are required"
            });
        }

        const result = await pool.query(
            `SELECT * FROM get_current_price($1, $2)`,
            [
                productId,
                cityId
            ]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Price not found"
            });
        }

        res.status(200).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get current price"
        });
    }
});


/*
|--------------------------------------------------------------------------
| GET /api/prices/history
| Get price history for one product in one city
|--------------------------------------------------------------------------
| Required:
| ?productId=...
| ?cityId=...
|
| Optional:
| ?from=...
| ?to=...
*/
router.get("/history", async (req: Request, res: Response) => {
    try {
        const {
            productId,
            cityId,
            from,
            to
        } = req.query;

        if (!productId || !cityId) {
            return res.status(400).json({
                success: false,
                message: "productId and cityId are required"
            });
        }

        const result = await pool.query(
            `SELECT * FROM get_price_history($1, $2, $3, $4)`,
            [
                productId,
                cityId,
                from || null,
                to || null
            ]
        );
        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to get price history"
        });
    }
});


export default router;