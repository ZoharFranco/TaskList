import express from 'express';

import {Task} from "../models/Task";


import {users} from "../dal/dal";
import {createTask, deleteTask, getTaskById, getTasks, updateTask} from "../controllers/taskController";
import {User} from "../models/User";
import {UserRequest} from "./requests/userRequest";
import {parseToken, verifyToken} from "../utils/authUtils/jwtUtils";


const router = express.Router();

// authenticate user connection
const authenticate = async (req: UserRequest, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({error: "No token provided"});

    try {
        const userId = verifyToken(parseToken(authHeader)).id;
        const user: User | undefined = Object.values(users).find((user) => user.id === userId) || undefined;
        if (!user) return res.status(404).json({error: "User not found"});
        req.user = user;
        next();
    } catch {
        res.status(403).json({error: "Invalid token"});
    }
};


// Get all user tasks
router.get("/tasks", authenticate, async (req: UserRequest, res: any) => {
    const tasks: Task[] | undefined = await getTasks(req.user);
    res.status(200).json(tasks?.map((task: Task) => task.createPlain()));
});

// Add user task
router.post("/tasks", authenticate, async (req: UserRequest, res: any) => {
    const {title, description} = req.body;
    const task: Task = await createTask(req.user, title, description);
    return res.status(201).json(task.createPlain());
});

// Update exist task
router.put("/tasks/:id", authenticate, async (req: UserRequest, res: any) => {
    const {title, description} = req.body;
    const task: Task | undefined = await updateTask(req.user, req.params.id, title, description);
    if (!task) return res.status(404).json({error: "Task not found"});
    return res.status(200).json(task.createPlain());
});

// Delete task
router.delete("/tasks/:id", authenticate, async (req: UserRequest, res: any) => {
    const deleted: boolean = await deleteTask(req.user, req.params.id)
    if (!deleted) return res.status(404).json({error: "Task not found"});
    return res.status(204).send({message: `Task ${req.params.id} deleted`});
});

export default router;
