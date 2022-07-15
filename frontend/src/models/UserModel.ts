export default interface UserModel {
  userId: number;
  username: string;
  email: string;
  token?: string;
  type: number;
}