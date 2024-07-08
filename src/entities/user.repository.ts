import { User } from './user.entity';
import { ExtendedEntityRepository } from './extended-entity.repository';

export class UserRepository extends ExtendedEntityRepository<User> {}
