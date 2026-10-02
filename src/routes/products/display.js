import asyncHandler from "express-async-handler";

const displayProducts = asyncHandler(async (req, res) => {
    const result = await db.query(
    `SELECT * FROM get_current_prices($1, $2, $3)`,
    [cityId, categoryId, search]
);
    res.status(200).json(result.rows);
});

export default displayProducts;