import { randomUUID } from 'node:crypto';
import { User, UserCreateInput, UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  usersRepository: User[] = [];

  async findById(id: string): Promise<User | null> {
    const user = this.usersRepository.find((user) => user.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.usersRepository.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create({ name, email, password_hash }: UserCreateInput) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.usersRepository.push(user);

    return {
      user,
    };
  }
}
