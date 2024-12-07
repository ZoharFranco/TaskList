import {User} from "../models/User";
import {Task} from "../models/Task";

import {v4 as uuidv4} from "uuid";
import {encrypt} from "../utils/cryptoUtils/symmetricEncryption";


export async function getTasks(user: User): Promise<Task[] | undefined> {
    return user.tasks;
};

export async function getTaskById(user: User, taskId: string): Promise<Task | undefined> {
    return user.tasks.find((t: Task) => {
        return t.id === taskId;
    });
}

export async function createTask(user: User, title: string, description: string): Promise<Task> {
    const task: Task = new Task(uuidv4(), title, description);
    task.description = encrypt(task.description)
    user.tasks.push(task);
    return task;
};

export async function updateTask(user: User, taskId: string, title: string, description: string): Promise<Task | undefined> {
    const task = user.tasks.find((task) => task.id === taskId);
    if (!task) return task;
    task.title = title;
    task.description = encrypt(description)
    return task;
}

export async function deleteTask(user: User, taskId: string): Promise<boolean> {
    const taskIndex = user.tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) return false;
    user.tasks.splice(taskIndex, 1);
    return true;
}


