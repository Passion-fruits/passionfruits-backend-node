export interface IJwtPayload {
  sub: string;
  type: 'access' | 'refresh';
}
