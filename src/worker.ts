import { getPageViews, incrementPageViews } from './database/core';
import { validateKey } from './utils/validator';

/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	DB: D1Database;
}

async function handlePageViewRequest(request: Request, env: Env): Promise<Response> {
	const startTime = Date.now();

	const pagePath = new URL(request.url).pathname;
	const urlParts = pagePath.split('/');
	const route = urlParts[1];

	if (route === 'pageview') {
		const key = urlParts[2];
		if (!validateKey(key)) {
			return new Response('Invalid key', { status: 400 });
		}

		const views = await getPageViews(env.DB, key);
		await incrementPageViews(env.DB, key, views);

		const endTime = Date.now();
		const response = new Response(`${views}`, { status: 200 });
		const duration = endTime - startTime;
		response.headers.set('Content-Type', 'text/plain');
		response.headers.set('X-Runtime', `${duration}`);
		return response;
	}

	return new Response('404 Not Found', { status: 404 });
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		if (request.method !== 'GET') {
			return new Response('Method not allowed', { status: 405 });
		}

		return handlePageViewRequest(request, env);
	},
};
