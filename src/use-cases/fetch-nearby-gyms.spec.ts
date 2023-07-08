import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch nearby gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to fetch nearby gyms', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await gymsRepository.create({
      title: 'Near Gym',
      description: null,
      phone: null,
      latitude: 22.8619754,
      longitude: -43.2127401,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: null,
      phone: null,
      latitude: 22.9621332,
      longitude: -43.1714104,
    });

    const { gyms } = await sut.execute({
      userLatitude: 22.8619754,
      userLongitude: -43.2127401,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Near Gym',
      }),
    ]);
  });
});
