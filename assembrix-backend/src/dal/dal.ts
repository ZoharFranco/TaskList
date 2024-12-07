import {User} from "../models/User";

export let users: Record<string, User> = {};

export async function saveUser(user: User) {
    users[user.username] = user
}

export async function getUser(username: string): Promise<User> {
    return users[username]
}

