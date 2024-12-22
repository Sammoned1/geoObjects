import { Optional } from "sequelize"

export interface IPointCreationAttributes extends Optional<IPointAttributes, 'id'>{
  name: string,
  type: string,
  coordinates: {
    type: 'Point',
    coordinates: [number, number]
  }
}

export interface IPointAttributes {
  id: number;
  name: string;
  type: string;
  coordinates: {
    type: 'Point';
    coordinates: [number, number];
  };
}