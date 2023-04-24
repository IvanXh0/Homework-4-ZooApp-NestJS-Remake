import { Schema } from 'mongoose';

export const ZookeeperSchema = new Schema({
  name: String,
  age: Number,
  location: String,
  isActive: Boolean,
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Animal',
      required: false,
    },
  ],
});
