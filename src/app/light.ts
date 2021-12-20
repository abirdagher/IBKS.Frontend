import { Room } from './room';
import { Type } from './type';

export interface Light {
    id?: number;
    name: string;
    description: string;
    type?: Type;
    room?: Room;
    typeId: number;
    roomId: number
  }