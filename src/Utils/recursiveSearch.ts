import { User } from "../types/User";

// Recursive search function for finding users
export function recursiveFindUserByUsername(
    users: User[],
    username: string,
    index: number = 0
): User | undefined {

    if (index >= users.length) {
      return undefined;
    }

    const current = users[index];
    if (current!.username === username) {
      return current;
    }

  return recursiveFindUserByUsername(users, username, index + 1);
}
