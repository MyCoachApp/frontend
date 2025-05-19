export interface UserProfile {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  location?: string | null;
  avatarUrl?: string | null;
  height?: number | null;
  weight?: number | null;
  bio?: string | null;
  joinDate?: string;
}