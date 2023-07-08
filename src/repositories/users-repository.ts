export type User = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'MEMBER' | 'ADMIN';
  created_at: Date;
};

export type UserCreateInput = Pick<
  Partial<User>,
  'id' | 'created_at' | 'role'
> &
  Omit<User, 'id' | 'created_at' | 'role'>;

export interface UsersRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create({
    name,
    email,
    password_hash,
  }: UserCreateInput): Promise<{ user: User }>;
}
