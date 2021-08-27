import Debug from 'debug';
import { Router } from 'express';
import request from 'request-promise';
import config from 'config';

const debug = Debug('GameTracker:main.routes');

const router = Router();

router.get('/games', (req, res) => {
	const games = config.get('availableGames');

	return res.formatter.ok({games});
})

router.get('/:game/:platform/:platformIdentifier', async(req, res) => {
	try {
		const url = config.get('trackerApi');
		const apiKey = config.get('apiKey')
		const { game, platform, platformIdentifier } = req.params;
		const response = await request.get(`${url}/${game}/standard/profile/${platform}/${platformIdentifier}`, { headers: { 'TRN-Api-Key': apiKey }});
		return res.formatter.ok(response);
	} catch (error) {
		debug(error);
		return res.formatter.badGateway(error.message || error.toString());
	}
});

export default router;