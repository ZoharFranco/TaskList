import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecret";
const TOKEN_EXPIRE_TIME = "90m";

const JWT_REFRESH_SECRET = "refreshsecret";
const REFRESH_TOKEN_EXPIRE_TIME = "7d";

export const generateToken = (userId: string): string => {
    return jwt.sign({id: userId}, JWT_SECRET, {expiresIn: TOKEN_EXPIRE_TIME});
};

export const generateRefreshToken = (userId: string): string => {
    return jwt.sign({id: userId}, JWT_REFRESH_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRE_TIME});
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, JWT_REFRESH_SECRET);
};

export const parseToken = (authHeader: string): string => {
    return authHeader.split(" ")[1]
};
