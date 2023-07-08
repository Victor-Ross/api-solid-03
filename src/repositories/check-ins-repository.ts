export type CheckIn = {
  id: string;
  created_at: Date;
  validated_at: Date | null;
  user_id: string;
  gym_id: string;
};

export type CheckInCreateInput = Pick<
  Partial<CheckIn>,
  'id' | 'created_at' | 'validated_at'
> &
  Omit<CheckIn, 'id' | 'created_at' | 'validated_at'>;

export interface CheckInsRepository {
  findById(id: string): Promise<CheckIn | null>;
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>;
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]>;
  countByUserId(userId: string): Promise<number>;
  save(checkIn: CheckIn): Promise<CheckIn>;
  create(data: CheckInCreateInput): Promise<CheckIn>;
}
