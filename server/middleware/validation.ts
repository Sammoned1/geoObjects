
import { NextFunction, Request, Response } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const {longitude, latitude, name} = req.body

  if (!name) {
    res.status(400).json({message: 'Название метки должно быть заполнено'})
    return
  }

  if (name.length > 255) {
    res.status(400).json({message: 'Название метки не должно превышать 255 символов'})
    return
  }
  
  if (longitude === undefined || longitude === null ||
      latitude === undefined || latitude === null) {
    res.status(400).json({message: 'Координаты не заполнены'})
    return
  }

  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    res.status(400).json({message: 'Оба значения должны быть числом'})
    return
  }

  if (longitude < -180 || longitude > 180) {
    res.status(400).json({message: 'Долгота должна быть в диапазоне от -180 до 180'})
    return
  }

  if (latitude < -90 || latitude > 90) {
    res.status(400).json({message: 'Широта должна быть в диапазоне от -90 до 90'})
    return
  }

  next()
}
