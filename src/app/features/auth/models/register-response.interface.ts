export interface RegisterResponse {
    message: string;
    user: {
      email: string;
      isVerified: boolean;
    };
  }