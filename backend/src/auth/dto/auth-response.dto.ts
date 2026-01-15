export class AuthResponseDto {
  message: string;
  access_token: string;
  admin: {
    id: string;
    email: string;
    role: string;
  };
}
