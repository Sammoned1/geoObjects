
import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(<string>process.env.POSTGRES_PORT, 10) || 3000,
  logging: false,
  define: {
    timestamps: true,
    underscored: true
  }
});
