'use strict';

import { NextFunction, Request, Response } from 'express';
import { resolve as resolvePath } from 'path';

export default {
  serveRootPage(_req: Request, res: Response, _next: NextFunction): void {
    // serve app description.
    res.sendFile(resolvePath('index.html'));
  },
};
