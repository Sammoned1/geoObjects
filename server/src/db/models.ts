
import { DataTypes, Model } from 'sequelize';
import { IPointAttributes, IPointCreationAttributes } from '../types/GeoObjectTypes';
import { sequelize } from './config';

export class Points extends Model<IPointAttributes, IPointCreationAttributes> implements IPointAttributes {
  declare id: number;
  declare name: string;
  declare type: string;
  declare coordinates: { type: 'Point'; coordinates: [number, number] };
}

Points.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.TEXT
    },
    coordinates: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Points',
    tableName: 'points',
    timestamps: true
  }
)