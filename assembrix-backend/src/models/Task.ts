import {decrypt} from "../utils/cryptoUtils/symmetricEncryption";

export class Task {
    id: string;
    title: string;
    description: string;

    constructor(id: string, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }


    createPlain() {
        return new Task(this.id, this.title, decrypt(this.description))
    }

}
