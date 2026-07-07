import { User } from "../types/User";
import { recursiveFindUserByUsername } from "../Utils/recursiveSearch";

export class UserStore {
    private users: User[] = [];   //list of users
    private nextId = 1;          //auto-increment ID

    // Create a new user
    createUser(username: string, password: string, email?: string): User {
        const newUser: User = {
            id: this.nextId++,
            username,
            password,
            email,
        };

        this.users.push(newUser);

        console.log("New user created:", newUser);

        return newUser;
    }

    // Get all users
    getAllUsers(): User[] {
        return this.users;
    }

    // Find user by username
    findByUsername(username: string): User | undefined {
        return recursiveFindUserByUsername(this.users, username);
    }

    // Find user by ID
    findById(id: number): User | undefined {
        return this.users.find((u) => u.id === id);
    }
}