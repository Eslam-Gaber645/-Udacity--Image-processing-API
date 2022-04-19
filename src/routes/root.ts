'use strict';
import { Router } from 'express';
import { rootControllers } from '../controllers';

const router: Router = Router();

router.get('/', rootControllers.serveRootPage);

export default router;
