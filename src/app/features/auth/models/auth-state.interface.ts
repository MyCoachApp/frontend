export interface AuthState {
  isAuthenticated: boolean;
  user: {
    email: string;
    roles: string[];
  } | null;
  token: string | null;
}