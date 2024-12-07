import express from "express";


const router = express.Router();

router.get(
    "/",
    async (req: any, res: any, next: any) => {
        try {
            return res.status(200).json({status: "Server alive", more: "/docs"});
        } catch (err) {
            next(err);
        }
    }
);

export default router;