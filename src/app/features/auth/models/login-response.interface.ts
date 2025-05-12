export interface LoginResponse {
  message: string;
  token: string;
  user: {
    email: string;
    roles: string[];
  };
}