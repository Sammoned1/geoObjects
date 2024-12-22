import { Points } from "../db/models"
import { IPointAttributes, IPointCreationAttributes } from "../types/GeoObjectTypes"


export class Geoobjects {

  static async getObjects (type?: string) {
    try {
      const result = await Points.findAll(type ? {
        where: {
          type
        }
      }: {})

      return result
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async createObject (data: IPointCreationAttributes) {
    try {
      const result = await Points.create(data)

      return result
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async updateObject (id: number, data: IPointCreationAttributes) {
    try {
      const record = await Points.findOne({
        where: {
          id
        }
      })

      if (record) {
        record.set(data)
        record.save()
      }

      return record
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  static async deleteObject (id: number) {
    try {
      const record = await Points.findOne({
        where: {
          id
        }
      })

      if (record) {
        record.destroy()
        record.save()
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}