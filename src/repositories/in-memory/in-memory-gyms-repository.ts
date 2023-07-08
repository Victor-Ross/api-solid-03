import { randomUUID } from 'node:crypto';
import { FindManyNearbyParams, Gym, GymsRepository } from '../gyms-repository';
import { GymCreateInput } from '../gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements GymsRepository {
  gymsRepository: Gym[] = [];

  async findById(id: string) {
    const gym = this.gymsRepository.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(userCoords: FindManyNearbyParams): Promise<Gym[]> {
    const nearbyGyms = this.gymsRepository.filter((gym) => {
      const distance = getDistanceBetweenCoordinates({
        from: {
          latitude: userCoords.latitude,
          longitude: userCoords.longitude,
        },
        to: { latitude: gym.latitude, longitude: gym.longitude },
      });

      return distance < 10;
    });

    return nearbyGyms;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gymsRepository
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description,
      phone: data.phone,
      latitude: data.latitude,
      longitude: data.longitude,
      created_at: new Date(),
    };

    this.gymsRepository.push(gym);

    return gym;
  }
}
