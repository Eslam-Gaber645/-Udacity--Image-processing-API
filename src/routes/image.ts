'use strict';
import { Router } from 'express';
import { imageControllers } from '../controllers';

const router: Router = Router();

router.get('/', imageControllers.getImage);

export default router;
