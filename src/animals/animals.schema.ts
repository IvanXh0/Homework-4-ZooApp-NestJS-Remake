import { Schema } from 'mongoose';

export const AnimalSchema = new Schema({
  id: String,
  name: String,
  type: String,
  age: Number,
  location: String,
  gender: String,
  characteristics: {
    food: [String],
    colour: String,
    isDangerous: Boolean,
    weight: Number,
    enclosure: {
      type: String,
      enum: [
        'mountain',
        'ice',
        'water',
        'jungle',
        'desert',
        'savana',
        'ocean',
        'rainforest',
      ],
    },
  },
  zookeeper: {
    type: Schema.Types.ObjectId,
    ref: 'Zookeeper',
  },
});
