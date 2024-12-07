import express from "express";

import {isUserExist, loginUser, registerUser} from "../controllers/userController";
import {generateRefreshToken, generateToken, verifyRefreshToken} from "../utils/authUtils/jwtUtils";


const router = express.Router();

router.post(
    "/register",
    async (req: any, res: any, next: any) => {
        try {
            const {username, password} = req.body;
            if (await isUserExist(username)) return res.status(400).json({error: "Username already exists"});
            await registerUser(username, password);
            return res.status(201).json({message: "User registered successfully"});
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/login",
    async (req: any, res: any, next: any) => {
        try {
            const {username, password} = req.body;
            const user = await loginUser(username, password);
            if (!user) return res.status(401).json({error: "Invalid credentials"});
            const token = generateToken(user.id);
            const refreshToken = generateRefreshToken(user.id);
            return res.status(200).json({token, refreshToken});
        } catch (err) {
            next(err);
        }
    }
);

router.post(
    "/token",
    async (req: any, res: any, next: any) => {
        try {
            const {refreshToken} = req.body;
            if (!refreshToken) return res.status(400).json({error: "Refresh token required"});
            try {
                const token = generateToken(verifyRefreshToken(refreshToken).id);
                return res.status(200).json({token});
            } catch {
                return res.status(403).json({error: "Invalid refresh token"});
            }
        } catch (err) {
            next(err);
        }
    }
);

export default router;
