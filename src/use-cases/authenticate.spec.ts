import { describe, expect, it, beforeEach } from 'vitest';
import { AuthenticateUseCase } from './authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UsersRepository } from '@/repositories/users-repository';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

let usersRepository: UsersRepository;
let sut: AuthenticateUseCase;

describe('Authenticase user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it('Should be able to authenticate an user', async () => {
    const password_hash = await hash('123456', 6);

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    });

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('Shoul not be able to authenticate with wrong email', async () => {
    const password_hash = await hash('123456', 6);

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    });

    await expect(
      async () =>
        await sut.execute({
          email: 'wrongdoe@example.com',
          password: '123456',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('Shoul not be able to authenticate with wrong password', async () => {
    const password_hash = await hash('123456', 6);

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash,
    });

    await expect(
      async () =>
        await sut.execute({
          email: 'johndoe@example.com',
          password: '123123',
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
