import { Enclosure } from '../dtos/animal.dto';

export interface Animal {
  id: string;
  name: string;
  type: string;
  age: number;
  location: string;
  gender: string;
  characteristics: {
    food: string[];
    colour: string;
    isDangerous: boolean;
    weight: number;
    enclosure: Enclosure;
  };
  zookeeper: string;
}
