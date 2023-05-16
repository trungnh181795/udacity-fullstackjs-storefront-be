import bcrypt from "bcrypt";
import {
  UserInterface,
  BaseUserInterface,
  BaseUserWithAuthInterface,
  ProcessResponse,
  Status,
  Maybe,
} from "../types";
import { useDatabase } from "../utils/use-database";

export class UserStore {
  private readonly sqlQueries = {
    getAllUsers: "SELECT * FROM users",
    createUser:
      "INSERT INTO users (firstname, lastname, username, password_digest) VALUES($1, $2, $3, $4) RETURNING *",
    getUserById: "SELECT * FROM users WHERE id=($1)",
    updateUserById:
      "UPDATE users SET firstname = $1, lastname = $2 WHERE id = $3 RETURNING *",
    deleteUserById: "DELETE FROM users WHERE id=($1)",
    authenticate: "SELECT password_digest FROM users WHERE username=($1)",
  };

  async getAllUsers(): Promise<ProcessResponse<UserInterface[]>> {
    try {
      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.getAllUsers
      );

      return {
        status: Status.SUCCESS,
        data: rows,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to get users' data. The error is: ${err}`,
      };
    }
  }
  async createUser(
    user: BaseUserWithAuthInterface
  ): Promise<ProcessResponse<UserInterface>> {
    const { firstname, lastname, username, password } = user;

    try {
      const hash = bcrypt.hashSync(
        password + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string, 10)
      );

      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.createUser,
        [firstname, lastname, username, hash]
      );

      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to add new user: ${firstname} ${lastname}. The error is: ${err}`,
      };
    }
  }

  async getUserById(id: number): Promise<ProcessResponse<UserInterface>> {
    try {
      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.getUserById,
        [id]
      );

      if (!rows || rows.length <= 0) {
        return {
          status: Status.FAIL,
          message: `No user found for ${id}`
        }
      }

      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to get user ${id}. The error is: ${err}`,
      };
    }
  }

  async updateUserById(
    id: number,
    newUserData: BaseUserInterface
  ): Promise<ProcessResponse<UserInterface>> {
    const { firstname, lastname } = newUserData;
    try {
      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.updateUserById,
        [firstname, lastname, id]
      );

      if (!rows || rows.length === 0) {
        return {
          status: Status.FAIL,
          message: `No user found for ${id}`,
        }
      }

      return {
        status: Status.SUCCESS,
        data: rows[0],
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to update user ${id} with ${firstname} and ${lastname}. The error is ${err}`,
      };
    }
  }

  async deleteUserById(id: number): Promise<ProcessResponse<null>> {
    try {
      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.getUserById,
        [id]
      );

      if (!rows || rows.length <= 0) {
        return {
          status: Status.FAIL,
          message: `No user found for ${id}!`,
        };
      }

      await useDatabase<UserInterface>(this.sqlQueries.deleteUserById, [id]);

      return {
        status: Status.SUCCESS,
        message: `Deleted user ${id} successfully!`,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to delete user ${id}. The error is: ${err}`,
      };
    }
  }

  async authenticate(
    username: string,
    password: string
  ): Promise<ProcessResponse<Maybe<UserInterface, null>>> {
    try {
      const rows = await useDatabase<UserInterface>(
        this.sqlQueries.authenticate,
        [username]
      );

      if (rows.length > 0) {
        const user = rows[0];
        if (
          bcrypt.compareSync(
            password + process.env.BCRYPT_PASSWORD,
            user.password_digest
          )
        ) {
          return {
            status: Status.SUCCESS,
            data: user,
          };
        }
      }

      return {
        status: Status.FAIL,
        data: null,
        message: `Fail to  find user ${username}. No user found.`,
      };
    } catch (err) {
      return {
        status: Status.FAIL,
        message: `Fail to  find user ${username}. The error is: ${err}`,
      };
    }
  }
}
