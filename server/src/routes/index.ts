import express from 'express';
import geoRouter from './geoobjects';

const router = express.Router()

router.use('/geoobjects', geoRouter)

export default router
