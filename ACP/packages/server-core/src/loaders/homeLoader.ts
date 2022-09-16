import * as express from 'express';
import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';

import { env } from '../env';

export const homeLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {
        const expressApp = settings.getData('express_app');
        expressApp.get(
            env.app.routePrefix,
            (req: express.Request, res: express.Response) => {
                return res.json({
                    name: env.app.name,
                    version: process.env.VERSION_NUMBER,
                    description: env.app.description,
                });
            }
        );
        expressApp.get(
            `${env.app.routePrefix}/api`,
            (req: express.Request, res: express.Response) =>{
                return res.status(200).json({ version: process.env.VERSION_NUMBER });
            }

        );

    }
};
