import {Request, Response, NextFunction} from "express";

import { seriesRatingContainer } from "../inversify.config";
import { TYPES } from "../types";
import SeriesRatingResolver from "../services/SeriesRatingResolver";

 
const seriesRatingResolver = seriesRatingContainer.get<SeriesRatingResolver>(TYPES.SeriesRatingResolver);

export class Routes {
    public routes(app): void {

        app.get('/', (req:Request, res:Response, next:NextFunction) => {
            res.status(200).send({
                'status': 'ok'
            });
        });

    	app.get('/series', async (req:Request, res:Response, next:NextFunction) => {

            if (!req.query.series || req.query.series=='') {
                res.status(400).send({
                    error: 'Invalid Params'
                });
                return;
            }

    		try {
				const seriesRatings = await seriesRatingResolver.resolveRating(req.query.series);

				res.status(200).send(seriesRatings);
    		} catch (err) {
				res.status(500).send({
					error: err
				});
    		}

    	});

    }
}