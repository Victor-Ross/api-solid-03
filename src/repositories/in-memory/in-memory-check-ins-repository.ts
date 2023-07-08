import { randomUUID } from 'node:crypto';
import {
  CheckIn,
  CheckInCreateInput,
  CheckInsRepository,
} from '../check-ins-repository';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInsRepository {
  checkInsRepository: CheckIn[] = [];

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.checkInsRepository.find(
      (checkIn) => checkIn.id === id
    );

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.checkInsRepository.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const checkIns = this.checkInsRepository
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);

    return checkIns;
  }

  async countByUserId(userId: string): Promise<number> {
    const checkInsByUserId = this.checkInsRepository.filter(
      (checkIn) => checkIn.user_id === userId
    );

    const countByUserId = checkInsByUserId.length;

    return countByUserId;
  }

  async save(newCheckIn: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.checkInsRepository.findIndex(
      (checkIn) => checkIn.id === newCheckIn.id
    );

    if (checkInIndex >= 0) {
      this.checkInsRepository[checkInIndex] = newCheckIn;
    }

    return newCheckIn;
  }

  async create(data: CheckInCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.checkInsRepository.push(checkIn);

    return checkIn;
  }
}
