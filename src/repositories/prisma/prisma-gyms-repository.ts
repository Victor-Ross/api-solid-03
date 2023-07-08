import { Gym as PrismaGym } from '@prisma/client';
import { prisma } from '@/libs/prisma';
import {
  FindManyNearbyParams,
  Gym,
  GymCreateInput,
  GymsRepository,
} from '../gyms-repository';

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const prismaGym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    if (prismaGym === null) {
      return null;
    }

    const gym = {
      ...prismaGym,
      latitude: prismaGym.latitude.toNumber(),
      longitude: prismaGym.longitude.toNumber(),
    };

    return gym;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const prismaGyms = await prisma.$queryRaw<PrismaGym[]>`
      SELECT 
            * 
      FROM 
            gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;

    const gyms = prismaGyms.map((gym) => {
      return {
        ...gym,
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      };
    });

    return gyms;
  }

  async searchMany(query: string, page: number) {
    const prismaGyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });

    const gyms = prismaGyms.map((gym) => {
      return {
        ...gym,
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      };
    });

    return gyms;
  }

  async create(data: GymCreateInput) {
    const prismaGym = await prisma.gym.create({
      data,
    });

    const gym = {
      ...prismaGym,
      latitude: prismaGym.latitude.toNumber(),
      longitude: prismaGym.longitude.toNumber(),
    };

    return gym;
  }
}
