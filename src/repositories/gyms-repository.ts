export type Gym = {
  id: string;
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
  created_at: Date;
};

export type GymCreateInput = Pick<Partial<Gym>, 'id' | 'created_at'> &
  Omit<Gym, 'id' | 'created_at'>;

export type FindManyNearbyParams = {
  latitude: number;
  longitude: number;
};

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  create(data: GymCreateInput): Promise<Gym>;
}
