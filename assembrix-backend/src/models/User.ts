import {Task} from "./Task";

export class User {
    id: string;
    username: string;
    password: string;
    tasks: Task[];

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.tasks = [];
    }
}
