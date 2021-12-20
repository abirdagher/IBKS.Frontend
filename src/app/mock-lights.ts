import { Light } from './light';
import { Room } from './room';
import { Type } from './type';


export const ROOMS: Room[] = [
  { id: 11, name: 'Room1', description: 'dhuhdifd'},
  { id: 12, name: 'Room2', description: 'dhuhdifd' },
  { id: 13, name: 'Room3', description: 'dhuhdifd' },
  { id: 14, name: 'Room4', description: 'dhuhdifd' }
];

export const TYPES: Type[] = [
  { id: 11, name: 'Type1', description: 'dhuhdifd'},
  { id: 12, name: 'Type2', description: 'dhuhdifd' },
  { id: 13, name: 'Type3', description: 'dhuhdifd' }
];

export const LIGHTS: Light[] = [
  { id: 11, name: 'Dr Nice', description: 'dhuhdifd', type: TYPES[0], room: ROOMS[0] },
  { id: 12, name: 'Narco', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[1] },
  { id: 13, name: 'Bombasto', description: 'dhuhdifd', type: TYPES[2], room: ROOMS[2] },
  { id: 14, name: 'Celeritas', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[3] },
  { id: 15, name: 'Magneta', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] },
  { id: 16, name: 'RubberMan', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] },
  { id: 17, name: 'Dynama', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] },
  { id: 18, name: 'Dr IQ', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] },
  { id: 19, name: 'Magma', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] },
  { id: 20, name: 'Tornado', description: 'dhuhdifd', type: TYPES[1], room: ROOMS[0] }
];
