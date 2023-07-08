import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe('Search gyms use case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to search for gyms', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: 22.8619754,
      longitude: -43.2127401,
    });

    await gymsRepository.create({
      title: 'typeScript Gym',
      description: null,
      phone: null,
      latitude: 22.8619754,
      longitude: -43.2127401,
    });

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym',
      }),
    ]);
  });

  it('should be able to fetch paginated gym search', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: 22.8619754,
        longitude: -43.2127401,
      });
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym 21',
      }),
      expect.objectContaining({
        title: 'JavaScript Gym 22',
      }),
    ]);
  });
});
