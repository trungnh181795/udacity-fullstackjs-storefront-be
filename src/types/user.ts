export interface BaseUserInterface {
  firstname: string;
  lastname: string;
}

export interface BaseUserWithAuthInterface extends BaseUserInterface {
  username: string;
  password: string;
}

export interface UserInterface extends BaseUserWithAuthInterface {
  id: number;
  password_digest?: string
}
