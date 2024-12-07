import {Request, Response, NextFunction} from 'express';
import {SQL_INJECTION_PATTERNS} from "./securityMiddlewaresConst";
import xss from 'xss';

export function sqlInjectionMiddleware(req: Request, res: Response, next: NextFunction): void {
    const checkInput = (input: any): boolean => {
        if (typeof input === 'string' && SQL_INJECTION_PATTERNS.some(pattern => pattern.test(input))) {
            return true;
        }
        if (typeof input === 'object' && input !== null) {
            for (let key in input) {
                if (input.hasOwnProperty(key) && checkInput(input[key])) {
                    return true;
                }
            }
        }
        return false;
    };

    if (checkInput(req.body) || checkInput(req.query) || checkInput(req.params)) {
        res.status(400).json({error: 'Potential SQL Injection detected in the input.'});
    } else {
        next();
    }
}


export function xssMiddleware(req: Request, res: Response, next: NextFunction): void {
    const sanitizeInput = (input: any): any => {
        if (typeof input === 'string') {
            return xss(input);
        }
        if (Array.isArray(input)) {
            return input.map(sanitizeInput);
        }
        if (typeof input === 'object' && input !== null) {
            const sanitizedObject: any = {};
            for (const key in input) {
                if (input.hasOwnProperty(key)) {
                    sanitizedObject[key] = sanitizeInput(input[key]);
                }
            }
            return sanitizedObject;
        }
        return input;
    }
    req.body = sanitizeInput(req.body);
    req.query = sanitizeInput(req.query);
    req.params = sanitizeInput(req.params);
    next();
}


