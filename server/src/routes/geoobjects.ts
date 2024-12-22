import express from 'express';
import { GeoobjectsController } from '../controllers/GeoobjectsController';
import {validate} from './../../middleware/validation';

const geoRouter = express.Router()

geoRouter.get('/', GeoobjectsController.getAllGeoobjects)
geoRouter.post('/', validate, GeoobjectsController.createGeoobject)
geoRouter.put('/:id', validate, GeoobjectsController.updateGeoobject)
geoRouter.delete('/:id', GeoobjectsController.deleteGeoobject)

export default geoRouter