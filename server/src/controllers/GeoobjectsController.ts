import { Geoobjects } from "../models/Geoobjects"
import { Request, Response } from 'express';
import { IPointCreationAttributes } from "../types/GeoObjectTypes";

export class GeoobjectsController {
  static async createGeoobject (req: Request, res: Response) {
    try {
      const bodyObj = req.body

      const insertObj: IPointCreationAttributes = {
        name: bodyObj.name,
        type: bodyObj.type,
        coordinates: {
          type: 'Point',
          coordinates: [bodyObj.latitude, bodyObj.longitude],
        }
      }

      const result = await Geoobjects.createObject(insertObj)

      res.status(200).json(result)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  static async getAllGeoobjects (req: Request<{}, {}, {}, {type: string | undefined}>, res: Response) {
    try {
      const {type} = req.query
      
      const result = await Geoobjects.getObjects(type)

      res.status(200).json(result)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  static async updateGeoobject (req: Request, res: Response) {
    try {
      const {id} = req.params
      const bodyObj = req.body

      const updateObj: IPointCreationAttributes = {
        name: bodyObj.name,
        type: bodyObj.type,
        coordinates: {
          type: 'Point',
          coordinates: [bodyObj.latitude, bodyObj.longitude],
        }
      }
      
      const record = await Geoobjects.updateObject(+id, updateObj)

      res.status(200).json(record)
    } catch (e) {
      console.error(e)
      res.status(500).json(e)
    }
  }

  static async deleteGeoobject (req: Request, res: Response) {
    try {
      const {id} = req.params

      await Geoobjects.deleteObject(+id)

      res.sendStatus(200)
    } catch (e) {
      res.status(500).json(e)
    }
  }
}