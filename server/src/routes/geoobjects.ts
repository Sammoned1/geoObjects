import express from 'express';
import { GeoobjectsController } from '../controllers/GeoobjectsController';
import validateCoordinates from './../../middleware/validation';

const geoRouter = express.Router()

geoRouter.get('/', GeoobjectsController.getAllGeoobjects)
geoRouter.post('/', validateCoordinates, GeoobjectsController.createGeoobject)
geoRouter.put('/:id', validateCoordinates, GeoobjectsController.updateGeoobject)
geoRouter.delete('/:id', GeoobjectsController.deleteGeoobject)

export default geoRouter