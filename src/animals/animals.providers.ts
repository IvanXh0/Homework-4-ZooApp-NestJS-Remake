import { Connection } from 'mongoose';
import { AnimalSchema } from './animals.schema';

export const animalProviders = [
  {
    provide: 'ANIMAL_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Animal', AnimalSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
