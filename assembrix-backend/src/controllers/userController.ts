import bcrypt from "bcrypt";
import {saveUser, getUser} from "../dal/dal";
import {User} from "../models/User";
import {v4 as uuidv4} from "uuid";


export const isUserExist = async (username: string): Promise<boolean> => {
    return await getUser(username) != null;
}

export const registerUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(uuidv4(), username, hashedPassword);
    await saveUser(user);
};

export const loginUser = async (username: string, password: string): Promise<User | undefined> => {
    if (await isUserExist(username) && await isUserValidCredentials(username, password))
        return getUser(username);
}

export const isUserValidCredentials = async (username: string, password: string): Promise<boolean> => {
    const user = await getUser(username);
    return !(!user || !(await bcrypt.compare(password, user.password)))
}

