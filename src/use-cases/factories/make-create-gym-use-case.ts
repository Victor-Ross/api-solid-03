import { CreateGymUseCase } from '../create-gym';

import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export function makeCreateGymUseCase() {
  const repository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCase(repository);

  return useCase;
}
