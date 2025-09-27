type LoginData = {
  email: string;
  password: string;
};

interface SignUpData extends LoginData {
  name: string;
  confirmPassword: string;
}
export type { LoginData, SignUpData };
