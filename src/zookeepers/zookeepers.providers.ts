import { Connection } from 'mongoose';
import { ZookeeperSchema } from './zookeeper.schema';

export const zookeeperProviders = [
  {
    provide: 'ZOOKEEPER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Zookeeper', ZookeeperSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
